import { Repository } from "typeorm";
import { SavedOpportunityRepository } from "@/modules/saved-opportunities/contracts/saved-opportunity.interfaces";
import { SavedOpportunity } from "@/modules/saved-opportunities/domain/saved-opportunity";
import { PaginatedResult } from "@/modules/opportunities/contracts/opportunity.interfaces";
import { SavedOpportunityOrmEntity } from "./saved-opportunity.orm-entity";
import { SavedOpportunityMapper } from "./saved-opportunity.mapper";

export class SavedOpportunityRepositoryImpl implements SavedOpportunityRepository {
  constructor(private readonly ormRepo: Repository<SavedOpportunityOrmEntity>) {}

  async save(saved: SavedOpportunity): Promise<SavedOpportunity> {
    const entity = SavedOpportunityMapper.toPersistence(saved);
    const result = await this.ormRepo.save(entity);
    return SavedOpportunityMapper.toDomain(result);
  }

  async delete(userId: string, opportunityId: string): Promise<void> {
    await this.ormRepo.delete({ userId, opportunityId });
  }

  async findByUserAndOpportunity(userId: string, opportunityId: string): Promise<SavedOpportunity | null> {
    const entity = await this.ormRepo.findOne({ where: { userId, opportunityId } });
    if (!entity) return null;
    return SavedOpportunityMapper.toDomain(entity);
  }

  async findByUserId(userId: string, page: number, limit: number): Promise<PaginatedResult<SavedOpportunity>> {
    const [entities, total] = await this.ormRepo.findAndCount({
      where: { userId },
      order: { createdAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
      relations: { opportunity: true },
    });

    return {
      data: entities.map(SavedOpportunityMapper.toDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
