import crypto from "crypto";
import { Document, DocumentType, DocumentStatus } from "@/modules/documents/domain/document";
import { DocumentRepository } from "@/modules/documents/contracts/document.interfaces";
import { GenerateDocumentDTO } from "@/modules/documents/contracts/document.schemas";
import { UserRepository } from "@/modules/users/contracts/user.interfaces";
import { OpportunityRepository } from "@/modules/opportunities/contracts/opportunity.interfaces";
import { UserProfile } from "@/modules/users/domain/user";
import { buildPrompt } from "./prompt-builder";
import { chatCompletion } from "@/infrastructure/ai/openai.client";
import CustomError from "@/shared/utils/custom-error";
import logger from "@/shared/utils/logger";

const DOCUMENT_TITLES: Record<string, string> = {
  cv: "Academic CV",
  sop: "Statement of Purpose",
  research_proposal: "Research Proposal",
};

export class DocumentService {
  constructor(
    private readonly documentRepo: DocumentRepository,
    private readonly userRepo: UserRepository,
    private readonly opportunityRepo: OpportunityRepository,
  ) {}

  async generateDocument(userId: string, dto: GenerateDocumentDTO) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new CustomError("User not found", 404);

    const profile = user.profile || new UserProfile("", "", "");

    let opportunity;
    if (dto.opportunityId) {
      opportunity = await this.opportunityRepo.findById(dto.opportunityId);
      if (!opportunity) throw new CustomError("Opportunity not found", 404);
    }

    const title = opportunity
      ? `${DOCUMENT_TITLES[dto.type]} - ${opportunity.title}`
      : DOCUMENT_TITLES[dto.type];

    // Create document record with pending status
    const doc = new Document(
      crypto.randomUUID(),
      userId,
      dto.type as DocumentType,
      title,
      dto.prompt,
      "",
      DocumentStatus.GENERATING,
      {},
      dto.opportunityId,
    );

    const saved = await this.documentRepo.create(doc);

    try {
      // TODO: Process asynchronously
      const { system, user: userPrompt } = buildPrompt(
        dto.type as DocumentType,
        profile,
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
