import { Education } from "../domain/education";
import { EducationRepository } from "../contracts/education.interfaces";
import { CreateEducationDTO, UpdateEducationDTO } from "../contracts/education.schemas";
import CustomError from "@/shared/utils/custom-error";

export class EducationService {
  constructor(private readonly educationRepo: EducationRepository) {}

  async create(userId: string, dto: CreateEducationDTO): Promise<Education> {
    const education = new Education(
      crypto.randomUUID(),
      userId,
      dto.institution,
      dto.degree as any,
      dto.fieldOfStudy,
      dto.gpa,
      dto.gpaScale,
      dto.startDate ? new Date(dto.startDate) : undefined,
      dto.endDate ? new Date(dto.endDate) : undefined,
      dto.country,
      dto.thesis,
      dto.description,
    );
    return this.educationRepo.create(education);
  }

  async findAll(userId: string): Promise<Education[]> {
    return this.educationRepo.findByUserId(userId);
  }

  async findOne(id: string, userId: string): Promise<Education> {
    const education = await this.educationRepo.findById(id);
    if (!education) throw new CustomError("Education not found", 404);
    if (education.userId !== userId) throw new CustomError("Forbidden", 403);
    return education;
  }

  async update(id: string, userId: string, dto: UpdateEducationDTO): Promise<Education> {
    const education = await this.findOne(id, userId);
    if (dto.institution !== undefined) education.institution = dto.institution;
    if (dto.degree !== undefined) education.degree = dto.degree as any;
    if (dto.fieldOfStudy !== undefined) education.fieldOfStudy = dto.fieldOfStudy;
    if (dto.gpa !== undefined) education.gpa = dto.gpa;
    if (dto.gpaScale !== undefined) education.gpaScale = dto.gpaScale;
    if (dto.startDate !== undefined) education.startDate = new Date(dto.startDate);
    if (dto.endDate !== undefined) education.endDate = new Date(dto.endDate);
    if (dto.country !== undefined) education.country = dto.country;
    if (dto.thesis !== undefined) education.thesis = dto.thesis;
    if (dto.description !== undefined) education.description = dto.description;
    return this.educationRepo.update(education);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.educationRepo.delete(id);
  }
}
