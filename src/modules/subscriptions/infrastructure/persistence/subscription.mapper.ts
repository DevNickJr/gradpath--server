import { Subscription, SubscriptionPlan, SubscriptionStatus } from "../../domain/subscription";
import { SubscriptionOrmEntity } from "./subscription.orm-entity";

export class SubscriptionMapper {
  static toDomain(entity: SubscriptionOrmEntity): Subscription {
    return new Subscription(
      entity.id,
      entity.userId,
      entity.flutterwaveTransactionId,
      entity.flutterwaveTransactionRef,
      entity.plan as SubscriptionPlan,
      Number(entity.amount),
      entity.currency,
      entity.status as SubscriptionStatus,
      entity.startDate,
      entity.endDate,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(subscription: Subscription): SubscriptionOrmEntity {
    const entity = new SubscriptionOrmEntity();
    entity.id = subscription.id;
    entity.userId = subscription.userId;
    entity.flutterwaveTransactionId = subscription.flutterwaveTransactionId;
    entity.flutterwaveTransactionRef = subscription.flutterwaveTransactionRef;
    entity.plan = subscription.plan;
    entity.amount = subscription.amount;
    entity.currency = subscription.currency;
    entity.status = subscription.status;
    entity.startDate = subscription.startDate;
    entity.endDate = subscription.endDate;
    entity.createdAt = subscription.createdAt;
    entity.updatedAt = subscription.updatedAt;
    return entity;
  }
}
