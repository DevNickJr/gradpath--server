import { Inquiry, InquiryStatus } from "../../domain/inquiry";
import { InquiryOrmEntity } from "./inquiry.orm-entity";

export class InquiryMapper {
  static toDomain(entity: InquiryOrmEntity): Inquiry {
    let author: { firstName: string; lastName: string; profileImage?: string } | undefined;

    if (entity.user?.profile) {
      author = {
        firstName: entity.user.profile.firstName || "",
        lastName: entity.user.profile.lastName || "",
        profileImage: entity.user.profile.profileImage,
      };
    }

    const replies = entity.replies?.map(r => InquiryMapper.toDomain(r)) || [];

    return new Inquiry(
      entity.id,
      entity.userId,
      entity.subject,
      entity.message,
      entity.status as InquiryStatus,
      entity.parentId || null,
      author,
      replies,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(inquiry: Inquiry): InquiryOrmEntity {
    const entity = new InquiryOrmEntity();
    entity.id = inquiry.id;
    entity.userId = inquiry.userId;
    entity.subject = inquiry.subject;
    entity.message = inquiry.message;
    entity.status = inquiry.status;
    entity.parentId = inquiry.parentId || undefined;
    entity.createdAt = inquiry.createdAt;
    entity.updatedAt = inquiry.updatedAt;
    return entity;
  }
}
