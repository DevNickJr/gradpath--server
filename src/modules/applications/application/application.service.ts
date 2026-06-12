import crypto from "crypto";
import { Application, ApplicationStatus } from "@/modules/applications/domain/application";
import { ApplicationRepository } from "@/modules/applications/contracts/application.interfaces";
import { OpportunityRepository } from "@/modules/opportunities/contracts/opportunity.interfaces";
import { CreateApplicationDTO, UpdateApplicationDTO } from "@/modules/applications/contracts/application.schemas";
import CustomError from "@/shared/utils/custom-error";

export class ApplicationService {
  constructor(
    private readonly applicationRepo: ApplicationRepository,
    private readonly opportunityRepo: OpportunityRepository,
  ) {}

  async create(userId: string, dto: CreateApplicationDTO) {
    const opp = await this.opportunityRepo.findById(dto.opportunityId);
    if (!opp) throw new CustomError("Opportunity not found", 404);

    const existing = await this.applicationRepo.findByUserAndOpportunity(userId, dto.opportunityId);
    if (existing) throw new CustomError("You are already tracking this opportunity", 400);

    const app = new Application(
      crypto.randomUUID(),
      userId,
      dto.opportunityId,
      ApplicationStatus.INTERESTED,
      dto.notes || "",
      undefined,
      dto.deadlineAt || opp.deadline,
    );

    return this.applicationRepo.create(app);
  }

  async getApplications(userId: string, status?: string, page = 1, limit = 20) {
    return this.applicationRepo.findByUserId(userId, status, page, limit);
  }

  async getApplication(id: string, userId: string) {
    const app = await this.applicationRepo.findById(id);
    if (!app) throw new CustomError("Application not found", 404);
    if (app.userId !== userId) throw new CustomError("Forbidden", 403);
    return app;
  }

  async update(id: string, userId: string, dto: UpdateApplicationDTO) {
    const app = await this.applicationRepo.findById(id);
    if (!app) throw new CustomError("Application not found", 404);
    if (app.userId !== userId) throw new CustomError("Forbidden", 403);

    if (dto.status !== undefined) app.status = dto.status as ApplicationStatus;
    if (dto.notes !== undefined) app.notes = dto.notes;
    if (dto.submittedAt !== undefined) app.submittedAt = dto.submittedAt;
    if (dto.deadlineAt !== undefined) app.deadlineAt = dto.deadlineAt;

    return this.applicationRepo.update(app);
  }

  async delete(id: string, userId: string) {
    const app = await this.applicationRepo.findById(id);
    if (!app) throw new CustomError("Application not found", 404);
    if (app.userId !== userId) throw new CustomError("Forbidden", 403);
    await this.applicationRepo.delete(id);
  }
}
