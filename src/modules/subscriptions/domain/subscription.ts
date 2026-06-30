export enum SubscriptionPlan {
  FREE = "free",
  BASIC = "basic",
  PRO = "pro",
}

export enum SubscriptionStatus {
  ACTIVE = "active",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
}

export class Subscription {
  constructor(
    public readonly id: string,
    public userId: string,
    public flutterwaveTransactionId: string,
    public flutterwaveTransactionRef: string,
    public plan: SubscriptionPlan,
    public amount: number,
    public currency: string,
    public status: SubscriptionStatus,
    public startDate: Date,
    public endDate: Date,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
