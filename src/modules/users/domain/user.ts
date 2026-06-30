import { RolesEnum } from "@/modules/users/contracts/user.interfaces";

export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public password: string,
    public role: RolesEnum = RolesEnum.STUDENT,
    public isVerified: boolean = false,
    public subscriptionPlan: string = "free",
    public profile?: UserProfile,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}

export class UserProfile {
  constructor(
    public readonly id: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public bio?: string,
    public profileImage?: string,
    public countryOfOrigin?: string,
    public targetCountries?: string[],
    public researchInterests?: string[],
  ) {}
}
