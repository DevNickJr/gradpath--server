import { UsageRecord, UsageAction } from "../../domain/usage-record";
import { UsageRecordOrmEntity } from "./usage-record.orm-entity";

export class UsageRecordMapper {
  static toDomain(entity: UsageRecordOrmEntity): UsageRecord {
    return new UsageRecord(
      entity.id,
      entity.userId,
      entity.action as UsageAction,
      entity.periodStart,
      entity.count,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(record: UsageRecord): UsageRecordOrmEntity {
    const entity = new UsageRecordOrmEntity();
    entity.id = record.id;
    entity.userId = record.userId;
    entity.action = record.action;
    entity.periodStart = record.periodStart;
    entity.count = record.count;
    entity.createdAt = record.createdAt;
    entity.updatedAt = record.updatedAt;
    return entity;
  }
}
