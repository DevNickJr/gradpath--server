import { Document, DocumentType, DocumentStatus } from "../../domain/document";
import { DocumentOrmEntity } from "./document.orm-entity";

export class DocumentMapper {
  static toDomain(entity: DocumentOrmEntity): Document {
    return new Document(
      entity.id,
      entity.userId,
      entity.type as DocumentType,
      entity.title,
      entity.prompt,
      entity.content,
      entity.status as DocumentStatus,
      entity.metadata || {},
      entity.opportunityId,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(doc: Document): DocumentOrmEntity {
    const entity = new DocumentOrmEntity();
    entity.id = doc.id;
    entity.userId = doc.userId;
    entity.type = doc.type;
    entity.title = doc.title;
    entity.prompt = doc.prompt;
    entity.content = doc.content;
    entity.status = doc.status;
    entity.metadata = doc.metadata;
    entity.opportunityId = doc.opportunityId;
    entity.createdAt = doc.createdAt;
    entity.updatedAt = doc.updatedAt;
    return entity;
  }
}
