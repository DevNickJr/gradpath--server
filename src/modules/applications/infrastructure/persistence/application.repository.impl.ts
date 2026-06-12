import { Repository, FindOptionsWhere } from "typeorm";
import { ApplicationRepository } from "@/modules/applications/contracts/application.interfaces";
import { Application } from "@/modules/applications/domain/application";
import { PaginatedResult } from "@/modules/opportunities/contracts/opportunity.interfaces";
import { ApplicationOrmEntity } from "./application.orm-entity";
import { ApplicationMapper } from "./application.mapper";

export class ApplicationRepositoryImpl implements ApplicationRepository {
  constructor(private readonly ormRepo: Repository<ApplicationOrmEntity>) {}

  async create(application: Application): Promise<Application> {
    const entity = ApplicationMapper.toPersistence(application);
    const saved = await this.ormRepo.save(entity);
    return ApplicationMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Application | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;
    return ApplicationMapper.toDomain(entity);
  }

  async findByUserId(userId: string, status: string | undefined, page: number, limit: number): Promise<PaginatedResult<Application>> {
    const where: FindOptionsWhere<ApplicationOrmEntity> = { userId };
    if (status) where.status = status;

    const [entities, total] = await this.ormRepo.findAndCount({
      where,
      order: { updatedAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
      relations: { opportunity: true },
    });

    return {
      data: entities.map(ApplicationMapper.toDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByUserAndOpportunity(userId: string, opportunityId: string): Promise<Application | null> {
    const entity = await this.ormRepo.findOne({ where: { userId, opportunityId } });
    if (!entity) return null;
    return ApplicationMapper.toDomain(entity);
  }

  async update(application: Application): Promise<Application> {
    const entity = ApplicationMapper.toPersistence(application);
    const updated = await this.ormRepo.save(entity);
    return ApplicationMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
