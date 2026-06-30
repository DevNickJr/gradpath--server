import { Repository } from "typeorm";
import { SubscriptionRepository } from "../../contracts/subscription.interfaces";
import { Subscription, SubscriptionStatus } from "../../domain/subscription";
import { SubscriptionOrmEntity } from "./subscription.orm-entity";
import { SubscriptionMapper } from "./subscription.mapper";

export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  constructor(
    private readonly ormRepo: Repository<SubscriptionOrmEntity>,
  ) {}

  async create(subscription: Subscription): Promise<Subscription> {
    const entity = SubscriptionMapper.toPersistence(subscription);
    const saved = await this.ormRepo.save(entity);
    return SubscriptionMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Subscription | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;
    return SubscriptionMapper.toDomain(entity);
  }

  async findActiveByUserId(userId: string): Promise<Subscription | null> {
    const entity = await this.ormRepo.findOne({
      where: { userId, status: SubscriptionStatus.ACTIVE },
      order: { createdAt: "DESC" },
    });
    if (!entity) return null;
    return SubscriptionMapper.toDomain(entity);
  }

  async findByTransactionRef(txRef: string): Promise<Subscription | null> {
    const entity = await this.ormRepo.findOne({
      where: { flutterwaveTransactionRef: txRef },
    });
    if (!entity) return null;
    return SubscriptionMapper.toDomain(entity);
  }

  async update(subscription: Subscription): Promise<Subscription> {
    const entity = SubscriptionMapper.toPersistence(subscription);
    const updated = await this.ormRepo.save(entity);
    return SubscriptionMapper.toDomain(updated);
  }
}
