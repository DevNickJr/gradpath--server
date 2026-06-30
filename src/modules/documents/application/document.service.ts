import crypto from "crypto";
import { Document, DocumentType, DocumentStatus } from "@/modules/documents/domain/document";
import { DocumentRepository } from "@/modules/documents/contracts/document.interfaces";
import { GenerateDocumentDTO } from "@/modules/documents/contracts/document.schemas";
import { UserRepository } from "@/modules/users/contracts/user.interfaces";
import { OpportunityRepository } from "@/modules/opportunities/contracts/opportunity.interfaces";
import { EducationRepository } from "@/modules/users/contracts/education.interfaces";
import { ExperienceRepository } from "@/modules/users/contracts/experience.interfaces";
import { PublicationRepository } from "@/modules/users/contracts/publication.interfaces";
import { TestScoreRepository } from "@/modules/users/contracts/test-score.interfaces";
import { CertificationRepository } from "@/modules/users/contracts/certification.interfaces";
import { AwardRepository } from "@/modules/users/contracts/award.interfaces";
import { RefereeRepository } from "@/modules/users/contracts/referee.interfaces";
import { UserProfile } from "@/modules/users/domain/user";
import { buildPrompt, EnrichedProfile } from "./prompt-builder";
import { chatCompletion } from "@/infrastructure/ai/openai.client";
import { UsageService } from "@/modules/subscriptions/application/usage.service";
import { UsageAction } from "@/modules/subscriptions/domain/usage-record";
import { SubscriptionPlan } from "@/modules/subscriptions/domain/subscription";
import CustomError from "@/shared/utils/custom-error";
import logger from "@/shared/utils/logger";

const DOCUMENT_TITLES: Record<string, string> = {
  cv: "Academic CV",
  sop: "Statement of Purpose",
  research_proposal: "Research Proposal",
  cold_email: "Cold Email to Supervisor",
  fee_waiver: "Fee Waiver Request",
  personal_statement: "Personal Statement",
};

export class DocumentService {
  constructor(
    private readonly documentRepo: DocumentRepository,
    private readonly userRepo: UserRepository,
    private readonly opportunityRepo: OpportunityRepository,
    private readonly educationRepo: EducationRepository,
    private readonly experienceRepo: ExperienceRepository,
    private readonly publicationRepo: PublicationRepository,
    private readonly testScoreRepo: TestScoreRepository,
    private readonly certificationRepo: CertificationRepository,
    private readonly awardRepo: AwardRepository,
    private readonly refereeRepo: RefereeRepository,
    private readonly usageService: UsageService,
  ) {}

  async generateDocument(userId: string, dto: GenerateDocumentDTO) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new CustomError("User not found", 404);

    const plan = user.subscriptionPlan || SubscriptionPlan.FREE;

    // Cold email is Pro-only
    if (dto.type === "cold_email" && plan === SubscriptionPlan.FREE) {
      throw new CustomError(
        "Cold email generation is a Pro feature. Please upgrade your plan.",
        403,
      );
    }

    // Check and increment document generation usage
    await this.usageService.checkAndIncrement(userId, UsageAction.DOCUMENT_GENERATION, plan);

    const profile = user.profile || new UserProfile("", "", "", "");

    let opportunity;
    if (dto.opportunityId) {
      opportunity = await this.opportunityRepo.findById(dto.opportunityId);
      if (!opportunity) throw new CustomError("Opportunity not found", 404);
    }

    // Fetch all sub-entities for enriched profile
    const [educations, experiences, publications, testScores, certifications, awards, referees] =
      await Promise.all([
        this.educationRepo.findByUserId(userId),
        this.experienceRepo.findByUserId(userId),
        this.publicationRepo.findByUserId(userId),
        this.testScoreRepo.findByUserId(userId),
        this.certificationRepo.findByUserId(userId),
        this.awardRepo.findByUserId(userId),
        this.refereeRepo.findByUserId(userId),
      ]);

    const enrichedProfile: EnrichedProfile = {
      profile,
      educations,
      experiences,
      publications,
      testScores,
      certifications,
      awards,
      referees,
    };

    const title = opportunity
      ? `${DOCUMENT_TITLES[dto.type]} - ${opportunity.title}`
      : DOCUMENT_TITLES[dto.type];

    // Create document record with pending status
    const doc = new Document({
      id: crypto.randomUUID(),
      userId,
      type: dto.type as DocumentType,
      title,
      content: "",
      status: DocumentStatus.GENERATING,
      metadata: {},
      opportunityId: dto.opportunityId || null,
    });

    const saved = await this.documentRepo.create(doc);

    try {
      const { system, user: userPrompt } = buildPrompt(
        dto.type as DocumentType,
        enrichedProfile,
        dto.prompt,
        opportunity || undefined,
      );

      const result = await chatCompletion([
        { role: "system", content: system },
        { role: "user", content: userPrompt },
      ]);

      saved.content = result.content;
      saved.status = DocumentStatus.COMPLETED;
      saved.metadata = {
        model: result.model,
        totalTokens: result.totalTokens,
        generatedAt: new Date().toISOString(),
      };

      return this.documentRepo.update(saved);
    } catch (error) {
      logger.error(`Document generation failed: ${error}`);
      saved.status = DocumentStatus.FAILED;
      saved.metadata = { error: String(error) };
      await this.documentRepo.update(saved);
      throw new CustomError("Document generation failed. Please try again.", 500);
    }
  }

  async getDocuments(userId: string, page = 1, limit = 20) {
    return this.documentRepo.findByUserId(userId, page, limit);
  }

  async getDocument(id: string, userId: string) {
    const doc = await this.documentRepo.findById(id);
    if (!doc) throw new CustomError("Document not found", 404);
    if (doc.userId !== userId) throw new CustomError("Forbidden", 403);
    return doc;
  }

  async deleteDocument(id: string, userId: string) {
    const doc = await this.documentRepo.findById(id);
    if (!doc) throw new CustomError("Document not found", 404);
    if (doc.userId !== userId) throw new CustomError("Forbidden", 403);
    await this.documentRepo.delete(id);
  }
}
