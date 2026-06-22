import { Publication, PublicationType } from "../../domain/publication";
import { PublicationOrmEntity } from "./publication.orm-entity";

export class PublicationMapper {
  static toDomain(entity: PublicationOrmEntity): Publication {
    return new Publication(
      entity.id,
      entity.userId,
      entity.title,
      entity.journal,
      entity.date ? new Date(entity.date) : undefined,
      entity.authors,
      entity.url,
      entity.type as PublicationType | undefined,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(pub: Publication): PublicationOrmEntity {
    const entity = new PublicationOrmEntity();
    entity.id = pub.id;
    entity.userId = pub.userId;
    entity.title = pub.title;
    entity.journal = pub.journal;
    entity.date = pub.date;
    entity.authors = pub.authors;
    entity.url = pub.url;
    entity.type = pub.type;
    entity.createdAt = pub.createdAt;
    entity.updatedAt = pub.updatedAt;
    return entity;
  }
}
