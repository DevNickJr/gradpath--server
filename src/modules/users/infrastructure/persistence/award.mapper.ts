import { Award } from "../../domain/award";
import { AwardOrmEntity } from "./award.orm-entity";

export class AwardMapper {
  static toDomain(entity: AwardOrmEntity): Award {
    return new Award(
      entity.id, entity.userId, entity.title, entity.issuingOrg,
      entity.date ? new Date(entity.date) : undefined,
      entity.description, entity.createdAt, entity.updatedAt,
    );
  }

  static toPersistence(award: Award): AwardOrmEntity {
    const entity = new AwardOrmEntity();
    entity.id = award.id; entity.userId = award.userId; entity.title = award.title;
    entity.issuingOrg = award.issuingOrg; entity.date = award.date;
    entity.description = award.description; entity.createdAt = award.createdAt;
    entity.updatedAt = award.updatedAt;
    return entity;
  }
}
