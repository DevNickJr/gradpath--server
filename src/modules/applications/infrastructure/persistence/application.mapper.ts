import { Application, ApplicationStatus } from "../../domain/application";
import { ApplicationOrmEntity } from "./application.orm-entity";

export class ApplicationMapper {
  static toDomain(entity: ApplicationOrmEntity): Application {
    return new Application(
      entity.id,
      entity.userId,
      entity.opportunityId,
      entity.status as ApplicationStatus,
      entity.notes,
      entity.submittedAt,
      entity.deadlineAt,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(app: Application): ApplicationOrmEntity {
    const entity = new ApplicationOrmEntity();
    entity.id = app.id;
    entity.userId = app.userId;
    entity.opportunityId = app.opportunityId;
    entity.status = app.status;
    entity.notes = app.notes;
    entity.submittedAt = app.submittedAt;
    entity.deadlineAt = app.deadlineAt;
    entity.createdAt = app.createdAt;
    entity.updatedAt = app.updatedAt;
    return entity;
  }
}
