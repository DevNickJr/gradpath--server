export enum UsageAction {
  DOCUMENT_GENERATION = "document_generation",
  RECOMMENDATION = "recommendation",
  COLD_EMAIL = "cold_email",
}

export class UsageRecord {
  constructor(
    public readonly id: string,
    public userId: string,
    public action: UsageAction,
    public periodStart: Date,
    public count: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
