import { Repository } from "typeorm";
import { OpportunityRepository, PaginatedResult, OpportunitySearchFilters, OpportunityStats } from "@/modules/opportunities/contracts/opportunity.interfaces";
import { Opportunity } from "@/modules/opportunities/domain/opportunity";
import { OpportunityOrmEntity } from "./opportunity.orm-entity";
import { OpportunityMapper } from "./opportunity.mapper";

export class OpportunityRepositoryImpl implements OpportunityRepository {
  constructor(
    private readonly ormRepo: Repository<OpportunityOrmEntity>
  ) {}

  async create(opportunity: Opportunity): Promise<Opportunity> {
    const entity = OpportunityMapper.toPersistence(opportunity);
    const saved = await this.ormRepo.save(entity);
    return OpportunityMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Opportunity | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;
    return OpportunityMapper.toDomain(entity);
  }

  async update(opportunity: Opportunity): Promise<Opportunity> {
    const entity = OpportunityMapper.toPersistence(opportunity);
    const updated = await this.ormRepo.save(entity);
    return OpportunityMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async search(filters: OpportunitySearchFilters): Promise<PaginatedResult<Opportunity>> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const sortBy = filters.sortBy || "createdAt";
    const sortOrder = filters.sortOrder || "DESC";

    const qb = this.ormRepo.createQueryBuilder("opp");

    // Default to active only
    if (filters.isActive !== false) {
      qb.andWhere("opp.isActive = :isActive", { isActive: true });
    }

    if (filters.country) {
      qb.andWhere("LOWER(opp.country) = LOWER(:country)", { country: filters.country });
    }

    if (filters.degreeLevel) {
      qb.andWhere("opp.degreeLevel = :degreeLevel", { degreeLevel: filters.degreeLevel });
    }

    if (filters.opportunityType) {
      qb.andWhere("opp.opportunityType = :opportunityType", { opportunityType: filters.opportunityType });
    }

    if (filters.fundingType) {
      qb.andWhere("opp.fundingType = :fundingType", { fundingType: filters.fundingType });
    }

    if (filters.search) {
      qb.andWhere(
        "(LOWER(opp.title) LIKE :search OR LOWER(opp.university) LIKE :search OR LOWER(opp.description) LIKE :search)",
        { search: `%${filters.search.toLowerCase()}%` }
      );
    }

    if (filters.deadlineBefore) {
      qb.andWhere("opp.deadline <= :deadlineBefore", { deadlineBefore: filters.deadlineBefore });
    }

    if (filters.deadlineAfter) {
      qb.andWhere("opp.deadline >= :deadlineAfter", { deadlineAfter: filters.deadlineAfter });
    }

    qb.orderBy(`opp.${sortBy}`, sortOrder);
    qb.skip((page - 1) * limit);
    qb.take(limit);

    const [entities, total] = await qb.getManyAndCount();

    return {
      data: entities.map(OpportunityMapper.toDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getStats(): Promise<OpportunityStats> {
    const result = await this.ormRepo
      .createQueryBuilder("opp")
      .select("COUNT(*)", "opportunities")
      .addSelect("COUNT(DISTINCT opp.university)", "universities")
      .addSelect("COUNT(DISTINCT opp.country)", "countries")
      .where("opp.isActive = :isActive", { isActive: true })
      .getRawOne();

    return {
      opportunities: parseInt(result?.opportunities ?? "0", 10),
      universities: parseInt(result?.universities ?? "0", 10),
      countries: parseInt(result?.countries ?? "0", 10),
    };
  }
}
