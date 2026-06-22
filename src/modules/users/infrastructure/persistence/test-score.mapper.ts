import { TestScore, TestName } from "../../domain/test-score";
import { TestScoreOrmEntity } from "./test-score.orm-entity";

export class TestScoreMapper {
  static toDomain(entity: TestScoreOrmEntity): TestScore {
    return new TestScore(
      entity.id, entity.userId, entity.testName as TestName,
      Number(entity.score), entity.subScores,
      entity.dateTaken ? new Date(entity.dateTaken) : undefined,
      entity.expiryDate ? new Date(entity.expiryDate) : undefined,
      entity.createdAt, entity.updatedAt,
    );
  }

  static toPersistence(ts: TestScore): TestScoreOrmEntity {
    const entity = new TestScoreOrmEntity();
    entity.id = ts.id; entity.userId = ts.userId;
    entity.testName = ts.testName; entity.score = ts.score;
    entity.subScores = ts.subScores; entity.dateTaken = ts.dateTaken;
    entity.expiryDate = ts.expiryDate; entity.createdAt = ts.createdAt;
    entity.updatedAt = ts.updatedAt;
    return entity;
  }
}
