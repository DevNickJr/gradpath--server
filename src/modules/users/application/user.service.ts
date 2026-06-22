import { User, UserProfile } from "@/modules/users/domain/user";
import { RolesEnum, UserRepository } from "@/modules/users/contracts/user.interfaces";
import { CreateUserDTO } from "@/modules/auth/contracts/auth.schemas";
import { UpdateProfileDTO, UpdateRoleDTO } from "@/modules/users/contracts/user.schemas";
import CustomError from "@/shared/utils/custom-error";

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(dto: CreateUserDTO) {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) throw new Error("User already exists");

    const user = new User(
      crypto.randomUUID(),
      dto.email,
      dto.password,
    );

    return this.userRepo.create(user);
  }

  async getUser(id: string) {
    return this.userRepo.findById(id);
  }

  async getProfile(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      profile: user.profile || null,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDTO) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    const cur = user.profile || new UserProfile("", "", "", "");

    user.profile = new UserProfile(
      cur.id || crypto.randomUUID(),
      dto.firstName ?? cur.firstName,
      dto.lastName ?? cur.lastName,
      dto.phoneNumber ?? cur.phoneNumber,
      dto.bio ?? cur.bio,
      dto.profileImage ?? cur.profileImage,
      dto.countryOfOrigin ?? cur.countryOfOrigin,
      dto.targetCountries ?? cur.targetCountries,
      dto.researchInterests ?? cur.researchInterests,
    );

    return this.userRepo.update(user);
  }

  async updateRole(userId: string, dto: UpdateRoleDTO) {
    const admin = await this.userRepo.findById(userId);
    if (!admin) throw new Error("User not found");

    if (admin.role !== RolesEnum.ADMIN) throw new CustomError("You are not authorized to perform this actiion ", 401);

    const user = await this.userRepo.findById(dto.userId);
    if (!user) throw new Error("User does not exist");

    user.role = dto.role;

    return this.userRepo.update(user);
  }
}
