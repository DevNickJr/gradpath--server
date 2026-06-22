import { Award } from "../domain/award";
import { AwardRepository } from "../contracts/award.interfaces";
import { CreateAwardDTO, UpdateAwardDTO } from "../contracts/award.schemas";
import CustomError from "@/shared/utils/custom-error";

export class AwardService {
  constructor(private readonly awardRepo: AwardRepository) {}

  async create(userId: string, dto: CreateAwardDTO): Promise<Award> {
    const award = new Award(
      crypto.randomUUID(), userId, dto.title, dto.issuingOrg,
      dto.date ? new Date(dto.date) : undefined, dto.description,
    );
    return this.awardRepo.create(award);
  }

  async findAll(userId: string): Promise<Award[]> {
    return this.awardRepo.findByUserId(userId);
  }

  async findOne(id: string, userId: string): Promise<Award> {
    const award = await this.awardRepo.findById(id);
    if (!award) throw new CustomError("Award not found", 404);
    if (award.userId !== userId) throw new CustomError("Forbidden", 403);
    return award;
  }

  async update(id: string, userId: string, dto: UpdateAwardDTO): Promise<Award> {
    const award = await this.findOne(id, userId);
    if (dto.title !== undefined) award.title = dto.title;
    if (dto.issuingOrg !== undefined) award.issuingOrg = dto.issuingOrg;
    if (dto.date !== undefined) award.date = new Date(dto.date);
    if (dto.description !== undefined) award.description = dto.description;
    return this.awardRepo.update(award);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.awardRepo.delete(id);
  }
}
