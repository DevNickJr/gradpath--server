import { UsageRecordRepository, SubscriptionRepository } from "../contracts/subscription.interfaces";
import { UsageAction } from "../domain/usage-record";
import { SubscriptionPlan } from "../domain/subscription";
import CustomError from "@/shared/utils/custom-error";

const USAGE_LIMITS: Record<string, Record<string, number>> = {
  [SubscriptionPlan.FREE]: {
    [UsageAction.DOCUMENT_GENERATION]: 3,
    [UsageAction.RECOMMENDATION]: 1,
    [UsageAction.COLD_EMAIL]: 0,
  },
  [SubscriptionPlan.BASIC]: {
    [UsageAction.DOCUMENT_GENERATION]: 25,
    [UsageAction.RECOMMENDATION]: 5,
    [UsageAction.COLD_EMAIL]: 0,
  },
  [SubscriptionPlan.PRO]: {
    [UsageAction.DOCUMENT_GENERATION]: Infinity,
    [UsageAction.RECOMMENDATION]: Infinity,
    [UsageAction.COLD_EMAIL]: Infinity,
  },
};

const ACTION_LABELS: Record<string, string> = {
  [UsageAction.DOCUMENT_GENERATION]: "document generations",
  [UsageAction.RECOMMENDATION]: "recommendation requests",
  [UsageAction.COLD_EMAIL]: "cold email generation",
};

export class UsageService {
  constructor(
    private readonly usageRecordRepo: UsageRecordRepository,
    private readonly subscriptionRepo: SubscriptionRepository,
  ) {}

  async checkAndIncrement(userId: string, action: UsageAction, plan: string): Promise<void> {
    const periodStart = await this.getPeriodStart(userId);
    const limit = USAGE_LIMITS[plan]?.[action] ?? USAGE_LIMITS[SubscriptionPlan.FREE][action];

    if (limit === 0) {
      throw new CustomError(
        `${ACTION_LABELS[action]} is only available on higher plans. Please upgrade.`,
        403,
      );
    }

    if (limit !== Infinity) {
      const currentUsage = await this.usageRecordRepo.getUsage(userId, action, periodStart);

      if (currentUsage >= limit) {
        throw new CustomError(
          `You have reached your monthly limit of ${limit} ${ACTION_LABELS[action]}. Upgrade for access.`,
          403,
        );
      }
    }

    const record = await this.usageRecordRepo.findOrCreate(userId, action, periodStart);
    await this.usageRecordRepo.increment(record.id);
  }

  async getUsageSummary(userId: string, plan: string) {
    const periodStart = await this.getPeriodStart(userId);
    const summary = await this.usageRecordRepo.getUsageSummary(userId, periodStart);
    const limits = USAGE_LIMITS[plan] ?? USAGE_LIMITS[SubscriptionPlan.FREE];

    return {
      documentGeneration: {
        used: summary[UsageAction.DOCUMENT_GENERATION] ?? 0,
        limit: limits[UsageAction.DOCUMENT_GENERATION] === Infinity ? -1 : limits[UsageAction.DOCUMENT_GENERATION],
      },
      recommendation: {
        used: summary[UsageAction.RECOMMENDATION] ?? 0,
        limit: limits[UsageAction.RECOMMENDATION] === Infinity ? -1 : limits[UsageAction.RECOMMENDATION],
      },
      coldEmail: {
        used: summary[UsageAction.COLD_EMAIL] ?? 0,
        limit: limits[UsageAction.COLD_EMAIL] === Infinity ? -1 : limits[UsageAction.COLD_EMAIL],
      },
    };
  }

  /**
   * Determines the start of the current usage period.
   * For paid users: anchored to the subscription's billing cycle day.
   * For free users: first day of the calendar month.
   */
  private async getPeriodStart(userId: string): Promise<Date> {
    const subscription = await this.subscriptionRepo.findActiveByUserId(userId);

    if (!subscription) {
      // Free user — use calendar month
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Paid user — compute the most recent billing cycle start
    const now = new Date();
    const anchorDay = subscription.startDate.getDate();

    // Start from the current month's anchor day
    let periodStart = new Date(now.getFullYear(), now.getMonth(), anchorDay);

    // If we haven't reached the anchor day yet this month,
    // the current cycle started last month
    if (periodStart > now) {
      periodStart = new Date(now.getFullYear(), now.getMonth() - 1, anchorDay);
    }

    return periodStart;
  }
}
