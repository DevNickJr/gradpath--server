import crypto from "crypto";
import { Repository } from "typeorm";
import { UsageRecordRepository } from "../../contracts/subscription.interfaces";
import { UsageRecord, UsageAction } from "../../domain/usage-record";
import { UsageRecordOrmEntity } from "./usage-record.orm-entity";
import { UsageRecordMapper } from "./usage-record.mapper";

export class UsageRecordRepositoryImpl implements UsageRecordRepository {
  constructor(
    private readonly ormRepo: Repository<UsageRecordOrmEntity>,
  ) {}

  async findOrCreate(userId: string, action: UsageAction, periodStart: Date): Promise<UsageRecord> {
    let entity = await this.ormRepo.findOne({
      where: { userId, action, periodStart },
    });

    if (!entity) {
      entity = this.ormRepo.create({
        id: crypto.randomUUID(),
        userId,
        action,
        periodStart,
        count: 0,
      });
      entity = await this.ormRepo.save(entity);
    }

    return UsageRecordMapper.toDomain(entity);
  }

  async increment(id: string): Promise<UsageRecord> {
    await this.ormRepo.increment({ id }, "count", 1);
    const updated = await this.ormRepo.findOne({ where: { id } });
    return UsageRecordMapper.toDomain(updated!);
  }

  async getUsage(userId: string, action: UsageAction, periodStart: Date): Promise<number> {
    const entity = await this.ormRepo.findOne({
      where: { userId, action, periodStart },
    });
    return entity?.count ?? 0;
  }

  async getUsageSummary(userId: string, periodStart: Date): Promise<Record<string, number>> {
    const entities = await this.ormRepo.find({
      where: { userId, periodStart },
    });

    const summary: Record<string, number> = {};
    for (const entity of entities) {
      summary[entity.action] = entity.count;
    }
    return summary;
  }
}
