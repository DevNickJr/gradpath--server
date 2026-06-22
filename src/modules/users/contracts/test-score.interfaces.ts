import { TestScore } from "../domain/test-score";

export interface TestScoreRepository {
  create(testScore: TestScore): Promise<TestScore>;
  findById(id: string): Promise<TestScore | null>;
  findByUserId(userId: string): Promise<TestScore[]>;
  update(testScore: TestScore): Promise<TestScore>;
  delete(id: string): Promise<void>;
}
