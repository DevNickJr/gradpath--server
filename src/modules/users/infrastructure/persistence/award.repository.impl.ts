import { Repository } from "typeorm";
import { AwardRepository } from "../../contracts/award.interfaces";
import { Award } from "../../domain/award";
import { AwardOrmEntity } from "./award.orm-entity";
import { AwardMapper } from "./award.mapper";

export class AwardRepositoryImpl implements AwardRepository {
  constructor(private readonly ormRepo: Repository<AwardOrmEntity>) {}

  async create(award: Award): Promise<Award> {
    const entity = AwardMapper.toPersistence(award);
    const saved = await this.ormRepo.save(entity);
    return AwardMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Award | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;
    return AwardMapper.toDomain(entity);
  }

  async findByUserId(userId: string): Promise<Award[]> {
    const entities = await this.ormRepo.find({ where: { userId }, order: { date: "DESC" } });
    return entities.map(AwardMapper.toDomain);
  }

  async update(award: Award): Promise<Award> {
    const entity = AwardMapper.toPersistence(award);
    const updated = await this.ormRepo.save(entity);
    return AwardMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
