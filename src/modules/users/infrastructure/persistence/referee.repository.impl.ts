import { Repository } from "typeorm";
import { RefereeRepository } from "../../contracts/referee.interfaces";
import { Referee } from "../../domain/referee";
import { RefereeOrmEntity } from "./referee.orm-entity";
import { RefereeMapper } from "./referee.mapper";

export class RefereeRepositoryImpl implements RefereeRepository {
  constructor(private readonly ormRepo: Repository<RefereeOrmEntity>) {}

  async create(referee: Referee): Promise<Referee> {
    const entity = RefereeMapper.toPersistence(referee);
    const saved = await this.ormRepo.save(entity);
    return RefereeMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Referee | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;
    return RefereeMapper.toDomain(entity);
  }

  async findByUserId(userId: string): Promise<Referee[]> {
    const entities = await this.ormRepo.find({ where: { userId }, order: { createdAt: "DESC" } });
    return entities.map(RefereeMapper.toDomain);
  }

  async update(referee: Referee): Promise<Referee> {
    const entity = RefereeMapper.toPersistence(referee);
    const updated = await this.ormRepo.save(entity);
    return RefereeMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
