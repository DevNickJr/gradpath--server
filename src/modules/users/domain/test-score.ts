export enum TestName {
  GRE = "GRE",
  TOEFL = "TOEFL",
  IELTS = "IELTS",
  GMAT = "GMAT",
  OTHER = "Other",
}

export class TestScore {
  constructor(
    public readonly id: string,
    public userId: string,
    public testName: TestName,
    public score: number,
    public subScores?: Record<string, number>,
    public dateTaken?: Date,
    public expiryDate?: Date,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
