import { Repository } from "typeorm";
import { ExperienceRepository } from "../../contracts/experience.interfaces";
import { Experience } from "../../domain/experience";
import { ExperienceOrmEntity } from "./experience.orm-entity";
import { ExperienceMapper } from "./experience.mapper";

export class ExperienceRepositoryImpl implements ExperienceRepository {
  constructor(private readonly ormRepo: Repository<ExperienceOrmEntity>) {}

  async create(experience: Experience): Promise<Experience> {
    const entity = ExperienceMapper.toPersistence(experience);
    const saved = await this.ormRepo.save(entity);
    return ExperienceMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Experience | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;
    return ExperienceMapper.toDomain(entity);
  }

  async findByUserId(userId: string): Promise<Experience[]> {
    const entities = await this.ormRepo.find({
      where: { userId },
      order: { startDate: "DESC" },
    });
    return entities.map(ExperienceMapper.toDomain);
  }

  async update(experience: Experience): Promise<Experience> {
    const entity = ExperienceMapper.toPersistence(experience);
    const updated = await this.ormRepo.save(entity);
    return ExperienceMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
