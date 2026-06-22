import { Referee } from "../../domain/referee";
import { RefereeOrmEntity } from "./referee.orm-entity";

export class RefereeMapper {
  static toDomain(entity: RefereeOrmEntity): Referee {
    return new Referee(
      entity.id, entity.userId, entity.name, entity.title,
      entity.institution, entity.email, entity.phone,
      entity.relationship, entity.createdAt, entity.updatedAt,
    );
  }

  static toPersistence(referee: Referee): RefereeOrmEntity {
    const entity = new RefereeOrmEntity();
    entity.id = referee.id; entity.userId = referee.userId; entity.name = referee.name;
    entity.title = referee.title; entity.institution = referee.institution;
    entity.email = referee.email; entity.phone = referee.phone;
    entity.relationship = referee.relationship;
    entity.createdAt = referee.createdAt; entity.updatedAt = referee.updatedAt;
    return entity;
  }
}
