import { Comment } from "../../domain/comment";
import { CommentOrmEntity } from "./comment.orm-entity";

export class CommentMapper {
  static toDomain(entity: CommentOrmEntity): Comment {
    let author: { firstName: string; lastName: string; profileImage?: string } | undefined;

    if (entity.user?.profile) {
      author = {
        firstName: entity.user.profile.firstName || "",
        lastName: entity.user.profile.lastName || "",
        profileImage: entity.user.profile.profileImage,
      };
    }

    const replies = entity.replies?.map(r => CommentMapper.toDomain(r)) || [];

    return new Comment(
      entity.id,
      entity.userId,
      entity.opportunityId,
      entity.content,
      entity.parentId || null,
      author,
      replies,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(comment: Comment): CommentOrmEntity {
    const entity = new CommentOrmEntity();
    entity.id = comment.id;
    entity.userId = comment.userId;
    entity.opportunityId = comment.opportunityId;
    entity.content = comment.content;
    entity.parentId = comment.parentId || undefined;
    entity.createdAt = comment.createdAt;
    entity.updatedAt = comment.updatedAt;
    return entity;
  }
}
