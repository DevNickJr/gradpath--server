import { Subscription } from "../domain/subscription";
import { UsageRecord, UsageAction } from "../domain/usage-record";

export interface SubscriptionRepository {
  create(subscription: Subscription): Promise<Subscription>;
  findById(id: string): Promise<Subscription | null>;
  findActiveByUserId(userId: string): Promise<Subscription | null>;
  findByTransactionRef(txRef: string): Promise<Subscription | null>;
  update(subscription: Subscription): Promise<Subscription>;
}

export interface UsageRecordRepository {
  findOrCreate(userId: string, action: UsageAction, periodStart: Date): Promise<UsageRecord>;
  increment(id: string): Promise<UsageRecord>;
  getUsage(userId: string, action: UsageAction, periodStart: Date): Promise<number>;
  getUsageSummary(userId: string, periodStart: Date): Promise<Record<string, number>>;
}
