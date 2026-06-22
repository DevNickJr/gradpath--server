import { Experience } from "../domain/experience";
import { ExperienceRepository } from "../contracts/experience.interfaces";
import { CreateExperienceDTO, UpdateExperienceDTO } from "../contracts/experience.schemas";
import CustomError from "@/shared/utils/custom-error";

export class ExperienceService {
  constructor(private readonly experienceRepo: ExperienceRepository) {}

  async create(userId: string, dto: CreateExperienceDTO): Promise<Experience> {
    const experience = new Experience(
      crypto.randomUUID(),
      userId,
      dto.title,
      dto.organization,
      dto.type as any,
      dto.startDate ? new Date(dto.startDate) : undefined,
      dto.endDate ? new Date(dto.endDate) : undefined,
      dto.isCurrent,
      dto.description,
      dto.location,
    );
    return this.experienceRepo.create(experience);
  }

  async findAll(userId: string): Promise<Experience[]> {
    return this.experienceRepo.findByUserId(userId);
  }

  async findOne(id: string, userId: string): Promise<Experience> {
    const experience = await this.experienceRepo.findById(id);
    if (!experience) throw new CustomError("Experience not found", 404);
    if (experience.userId !== userId) throw new CustomError("Forbidden", 403);
    return experience;
  }

  async update(id: string, userId: string, dto: UpdateExperienceDTO): Promise<Experience> {
    const experience = await this.findOne(id, userId);
    if (dto.title !== undefined) experience.title = dto.title;
    if (dto.organization !== undefined) experience.organization = dto.organization;
    if (dto.type !== undefined) experience.type = dto.type as any;
    if (dto.startDate !== undefined) experience.startDate = new Date(dto.startDate);
    if (dto.endDate !== undefined) experience.endDate = new Date(dto.endDate);
    if (dto.isCurrent !== undefined) experience.isCurrent = dto.isCurrent;
    if (dto.description !== undefined) experience.description = dto.description;
    if (dto.location !== undefined) experience.location = dto.location;
    return this.experienceRepo.update(experience);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.experienceRepo.delete(id);
  }
}
