import { Document, DocumentType, DocumentStatus } from "../../domain/document";
import { DocumentOrmEntity } from "./document.orm-entity";

export class DocumentMapper {
  static toDomain(entity: DocumentOrmEntity): Document {
    return new Document({
      id: entity.id,
      userId: entity.userId,
      type: entity.type as DocumentType,
      title: entity.title,
      prompt: entity.prompt,
      content: entity.content,
      status: entity.status as DocumentStatus,
      metadata: entity.metadata || {},
      opportunityId: entity.opportunityId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    })
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
    entity.opportunityId = doc.opportunityId || undefined;
    entity.createdAt = doc.createdAt;
    entity.updatedAt = doc.updatedAt;
    return entity;
  }
}
