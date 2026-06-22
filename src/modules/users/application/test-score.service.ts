import { TestScore } from "../domain/test-score";
import { TestScoreRepository } from "../contracts/test-score.interfaces";
import { CreateTestScoreDTO, UpdateTestScoreDTO } from "../contracts/test-score.schemas";
import CustomError from "@/shared/utils/custom-error";

export class TestScoreService {
  constructor(private readonly testScoreRepo: TestScoreRepository) {}

  async create(userId: string, dto: CreateTestScoreDTO): Promise<TestScore> {
    const ts = new TestScore(
      crypto.randomUUID(), userId, dto.testName as any, dto.score,
      dto.subScores, dto.dateTaken ? new Date(dto.dateTaken) : undefined,
      dto.expiryDate ? new Date(dto.expiryDate) : undefined,
    );
    return this.testScoreRepo.create(ts);
  }

  async findAll(userId: string): Promise<TestScore[]> {
    return this.testScoreRepo.findByUserId(userId);
  }

  async findOne(id: string, userId: string): Promise<TestScore> {
    const ts = await this.testScoreRepo.findById(id);
    if (!ts) throw new CustomError("Test score not found", 404);
    if (ts.userId !== userId) throw new CustomError("Forbidden", 403);
    return ts;
  }

  async update(id: string, userId: string, dto: UpdateTestScoreDTO): Promise<TestScore> {
    const ts = await this.findOne(id, userId);
    if (dto.testName !== undefined) ts.testName = dto.testName as any;
    if (dto.score !== undefined) ts.score = dto.score;
    if (dto.subScores !== undefined) ts.subScores = dto.subScores;
    if (dto.dateTaken !== undefined) ts.dateTaken = new Date(dto.dateTaken);
    if (dto.expiryDate !== undefined) ts.expiryDate = new Date(dto.expiryDate);
    return this.testScoreRepo.update(ts);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.testScoreRepo.delete(id);
  }
}
