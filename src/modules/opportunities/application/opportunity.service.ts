import crypto from "crypto";
import { Opportunity } from "@/modules/opportunities/domain/opportunity";
import { OpportunityRepository, OpportunitySearchFilters } from "@/modules/opportunities/contracts/opportunity.interfaces";
import { CreateOpportunityDTO, UpdateOpportunityDTO, SearchOpportunityQuery } from "@/modules/opportunities/contracts/opportunity.schemas";
import CustomError from "@/shared/utils/custom-error";

export class OpportunityService {
  constructor(private readonly opportunityRepo: OpportunityRepository) {}

  async create(adminId: string, dto: CreateOpportunityDTO) {
    const opportunity = new Opportunity(
      crypto.randomUUID(),
      dto.title,
      dto.description,
      dto.university,
      dto.country,
      dto.opportunityType as any,
      dto.degreeLevel as any,
      dto.fieldsOfStudy,
      dto.fundingType as any,
      dto.benefits,
      dto.deadline,
      dto.applicationLink,
      dto.sourceUrl,
      true,
      dto.isFeatured,
      adminId,
    );

    return this.opportunityRepo.create(opportunity);
  }

  async getById(id: string) {
    const opp = await this.opportunityRepo.findById(id);
    if (!opp) throw new CustomError("Opportunity not found", 404);
    return opp;
  }

  async update(id: string, dto: UpdateOpportunityDTO) {
    const opp = await this.opportunityRepo.findById(id);
    if (!opp) throw new CustomError("Opportunity not found", 404);

    if (dto.title !== undefined) opp.title = dto.title;
    if (dto.description !== undefined) opp.description = dto.description;
    if (dto.university !== undefined) opp.university = dto.university;
    if (dto.country !== undefined) opp.country = dto.country;
    if (dto.opportunityType !== undefined) opp.opportunityType = dto.opportunityType as any;
    if (dto.degreeLevel !== undefined) opp.degreeLevel = dto.degreeLevel as any;
    if (dto.fieldsOfStudy !== undefined) opp.fieldsOfStudy = dto.fieldsOfStudy;
    if (dto.fundingType !== undefined) opp.fundingType = dto.fundingType as any;
    if (dto.benefits !== undefined) opp.benefits = dto.benefits;
    if (dto.deadline !== undefined) opp.deadline = dto.deadline;
    if (dto.applicationLink !== undefined) opp.applicationLink = dto.applicationLink;
    if (dto.sourceUrl !== undefined) opp.sourceUrl = dto.sourceUrl;
    if (dto.isFeatured !== undefined) opp.isFeatured = dto.isFeatured;

    return this.opportunityRepo.update(opp);
  }

  async delete(query: {
    ownerId: string;
    opportunityId: string;
  }) {
    const opp = await this.opportunityRepo.findById(query.opportunityId);
    if (!opp) throw new CustomError("Opportunity not found", 404);

    if (opp.createdById == query.ownerId)
    await this.opportunityRepo.delete(query.opportunityId);
  }

  async search(query: SearchOpportunityQuery) {
    const filters: OpportunitySearchFilters = {
      country: query.country,
      degreeLevel: query.degreeLevel,
      opportunityType: query.opportunityType,
      fundingType: query.fundingType,
      search: query.search,
      deadlineBefore: query.deadlineBefore ? new Date(query.deadlineBefore) : undefined,
      deadlineAfter: query.deadlineAfter ? new Date(query.deadlineAfter) : undefined,
      isActive: true,
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    };

    return this.opportunityRepo.search(filters);
  }
}
