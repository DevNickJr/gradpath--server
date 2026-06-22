import { Education, DegreeType } from "../../domain/education";
import { EducationOrmEntity } from "./education.orm-entity";

export class EducationMapper {
  static toDomain(entity: EducationOrmEntity): Education {
    return new Education(
      entity.id,
      entity.userId,
      entity.institution,
      entity.degree as DegreeType,
      entity.fieldOfStudy,
      entity.gpa ? Number(entity.gpa) : undefined,
      entity.gpaScale ? Number(entity.gpaScale) : undefined,
      entity.startDate ? new Date(entity.startDate) : undefined,
      entity.endDate ? new Date(entity.endDate) : undefined,
      entity.country,
      entity.thesis,
      entity.description,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(education: Education): EducationOrmEntity {
    const entity = new EducationOrmEntity();
    entity.id = education.id;
    entity.userId = education.userId;
    entity.institution = education.institution;
    entity.degree = education.degree;
    entity.fieldOfStudy = education.fieldOfStudy;
    entity.gpa = education.gpa;
    entity.gpaScale = education.gpaScale;
    entity.startDate = education.startDate;
    entity.endDate = education.endDate;
    entity.country = education.country;
    entity.thesis = education.thesis;
    entity.description = education.description;
    entity.createdAt = education.createdAt;
    entity.updatedAt = education.updatedAt;
    return entity;
  }
}
