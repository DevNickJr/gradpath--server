import { Repository } from "typeorm";
import { CertificationRepository } from "../../contracts/certification.interfaces";
import { Certification } from "../../domain/certification";
import { CertificationOrmEntity } from "./certification.orm-entity";
import { CertificationMapper } from "./certification.mapper";

export class CertificationRepositoryImpl implements CertificationRepository {
  constructor(private readonly ormRepo: Repository<CertificationOrmEntity>) {}

  async create(cert: Certification): Promise<Certification> {
    const entity = CertificationMapper.toPersistence(cert);
    const saved = await this.ormRepo.save(entity);
    return CertificationMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Certification | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;
    return CertificationMapper.toDomain(entity);
  }

  async findByUserId(userId: string): Promise<Certification[]> {
    const entities = await this.ormRepo.find({ where: { userId }, order: { dateIssued: "DESC" } });
    return entities.map(CertificationMapper.toDomain);
  }

  async update(cert: Certification): Promise<Certification> {
    const entity = CertificationMapper.toPersistence(cert);
    const updated = await this.ormRepo.save(entity);
    return CertificationMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
