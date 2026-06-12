import { RolesEnum } from "@/modules/users/contracts/user.interfaces";
import { User, UserProfile } from "../../domain/user";
import { UserOrmEntity } from "./user.orm-entity";
import { UserProfileOrmEntity } from "./user-profile.orm-entity";

export class UserMapper {
  static toDomain(entity: UserOrmEntity): User {
    let profile: UserProfile | undefined;

    if (entity.profile) {
      profile = new UserProfile(
        entity.profile.firstName || "",
        entity.profile.lastName || "",
        entity.profile.phoneNumber || "",
        entity.profile.bio,
        entity.profile.profileImage,
        entity.profile.university,
        entity.profile.degree,
        entity.profile.fieldOfStudy,
        entity.profile.gpa ? Number(entity.profile.gpa) : undefined,
        entity.profile.graduationYear,
        entity.profile.countryOfOrigin,
        entity.profile.targetCountries,
        entity.profile.researchInterests,
        entity.profile.publications,
        entity.profile.workExperience,
        entity.profile.skills,
      );
    }

    return new User(
      entity.id,
      entity.email,
      entity.password,
      entity.role as RolesEnum,
      entity.isVerified,
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
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;

    if (user.profile) {
      const p = new UserProfileOrmEntity();
      p.firstName = user.profile.firstName;
      p.lastName = user.profile.lastName;
      p.phoneNumber = user.profile.phoneNumber;
      p.bio = user.profile.bio;
      p.profileImage = user.profile.profileImage;
      p.university = user.profile.university;
      p.degree = user.profile.degree;
      p.fieldOfStudy = user.profile.fieldOfStudy;
      p.gpa = user.profile.gpa;
      p.graduationYear = user.profile.graduationYear;
      p.countryOfOrigin = user.profile.countryOfOrigin;
      p.targetCountries = user.profile.targetCountries;
      p.researchInterests = user.profile.researchInterests;
      p.publications = user.profile.publications;
      p.workExperience = user.profile.workExperience;
      p.skills = user.profile.skills;
      p.userId = user.id;
      entity.profile = p;
    }

    return entity;
  }
}
