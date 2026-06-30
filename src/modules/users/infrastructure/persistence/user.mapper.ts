import { RolesEnum } from "@/modules/users/contracts/user.interfaces";
import { User, UserProfile } from "../../domain/user";
import { UserOrmEntity } from "./user.orm-entity";
import { UserProfileOrmEntity } from "./user-profile.orm-entity";

export class UserMapper {
  static toDomain(entity: UserOrmEntity): User {
    let profile: UserProfile | undefined;

    if (entity.profile) {
      profile = new UserProfile(
        entity.profile.id || "",
        entity.profile.firstName || "",
        entity.profile.lastName || "",
        entity.profile.phoneNumber || "",
        entity.profile.bio,
        entity.profile.profileImage,
        entity.profile.countryOfOrigin,
        entity.profile.targetCountries,
        entity.profile.researchInterests,
      );
    }

    return new User(
      entity.id,
      entity.email,
      entity.password,
      entity.role as RolesEnum,
      entity.isVerified,
      entity.subscriptionPlan || "free",
      profile,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(user: User): UserOrmEntity {
    const entity = new UserOrmEntity();

    entity.id = user.id;
    entity.email = user.email;
    entity.password = user.password;
    entity.role = user.role;
    entity.isVerified = user.isVerified;
    entity.subscriptionPlan = user.subscriptionPlan || "free";
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;

    if (user.profile) {
      const p = new UserProfileOrmEntity();
      p.id = user.profile.id;
      p.firstName = user.profile.firstName;
      p.lastName = user.profile.lastName;
      p.phoneNumber = user.profile.phoneNumber;
      p.bio = user.profile.bio;
      p.profileImage = user.profile.profileImage;
      p.countryOfOrigin = user.profile.countryOfOrigin;
      p.targetCountries = user.profile.targetCountries;
      p.researchInterests = user.profile.researchInterests;
      p.userId = user.id;
      entity.profile = p;
    }

    return entity;
  }
}
