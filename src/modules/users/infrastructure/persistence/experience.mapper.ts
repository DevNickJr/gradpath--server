import { Experience, ExperienceType } from "../../domain/experience";
import { ExperienceOrmEntity } from "./experience.orm-entity";

export class ExperienceMapper {
  static toDomain(entity: ExperienceOrmEntity): Experience {
    return new Experience(
      entity.id,
      entity.userId,
      entity.title,
      entity.organization,
      entity.type as ExperienceType,
      entity.startDate ? new Date(entity.startDate) : undefined,
      entity.endDate ? new Date(entity.endDate) : undefined,
      entity.isCurrent,
      entity.description,
      entity.location,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(experience: Experience): ExperienceOrmEntity {
    const entity = new ExperienceOrmEntity();
    entity.id = experience.id;
    entity.userId = experience.userId;
    entity.title = experience.title;
    entity.organization = experience.organization;
    entity.type = experience.type;
    entity.startDate = experience.startDate;
    entity.endDate = experience.endDate;
    entity.isCurrent = experience.isCurrent;
    entity.description = experience.description;
    entity.location = experience.location;
    entity.createdAt = experience.createdAt;
    entity.updatedAt = experience.updatedAt;
    return entity;
  }
}
