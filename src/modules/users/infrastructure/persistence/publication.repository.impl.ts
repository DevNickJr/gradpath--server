import { Repository } from "typeorm";
import { PublicationRepository } from "../../contracts/publication.interfaces";
import { Publication } from "../../domain/publication";
import { PublicationOrmEntity } from "./publication.orm-entity";
import { PublicationMapper } from "./publication.mapper";

export class PublicationRepositoryImpl implements PublicationRepository {
  constructor(private readonly ormRepo: Repository<PublicationOrmEntity>) {}

  async create(pub: Publication): Promise<Publication> {
    const entity = PublicationMapper.toPersistence(pub);
    const saved = await this.ormRepo.save(entity);
    return PublicationMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Publication | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;
    return PublicationMapper.toDomain(entity);
  }

  async findByUserId(userId: string): Promise<Publication[]> {
    const entities = await this.ormRepo.find({ where: { userId }, order: { date: "DESC" } });
    return entities.map(PublicationMapper.toDomain);
  }

  async update(pub: Publication): Promise<Publication> {
    const entity = PublicationMapper.toPersistence(pub);
    const updated = await this.ormRepo.save(entity);
    return PublicationMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
