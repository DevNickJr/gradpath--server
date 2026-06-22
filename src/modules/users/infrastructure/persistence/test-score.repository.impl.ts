import { Repository } from "typeorm";
import { TestScoreRepository } from "../../contracts/test-score.interfaces";
import { TestScore } from "../../domain/test-score";
import { TestScoreOrmEntity } from "./test-score.orm-entity";
import { TestScoreMapper } from "./test-score.mapper";

export class TestScoreRepositoryImpl implements TestScoreRepository {
  constructor(private readonly ormRepo: Repository<TestScoreOrmEntity>) {}

  async create(ts: TestScore): Promise<TestScore> {
    const entity = TestScoreMapper.toPersistence(ts);
    const saved = await this.ormRepo.save(entity);
    return TestScoreMapper.toDomain(saved);
  }

  async findById(id: string): Promise<TestScore | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;
    return TestScoreMapper.toDomain(entity);
  }

  async findByUserId(userId: string): Promise<TestScore[]> {
    const entities = await this.ormRepo.find({ where: { userId }, order: { dateTaken: "DESC" } });
    return entities.map(TestScoreMapper.toDomain);
  }

  async update(ts: TestScore): Promise<TestScore> {
    const entity = TestScoreMapper.toPersistence(ts);
    const updated = await this.ormRepo.save(entity);
    return TestScoreMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
