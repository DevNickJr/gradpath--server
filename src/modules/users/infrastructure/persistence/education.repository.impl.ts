import { Repository } from "typeorm";
import { EducationRepository } from "../../contracts/education.interfaces";
import { Education } from "../../domain/education";
import { EducationOrmEntity } from "./education.orm-entity";
import { EducationMapper } from "./education.mapper";

export class EducationRepositoryImpl implements EducationRepository {
  constructor(private readonly ormRepo: Repository<EducationOrmEntity>) {}

  async create(education: Education): Promise<Education> {
    const entity = EducationMapper.toPersistence(education);
    const saved = await this.ormRepo.save(entity);
    return EducationMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Education | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;
    return EducationMapper.toDomain(entity);
  }

  async findByUserId(userId: string): Promise<Education[]> {
    const entities = await this.ormRepo.find({
      where: { userId },
      order: { startDate: "DESC" },
    });
    return entities.map(EducationMapper.toDomain);
  }

  async update(education: Education): Promise<Education> {
    const entity = EducationMapper.toPersistence(education);
    const updated = await this.ormRepo.save(entity);
    return EducationMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
