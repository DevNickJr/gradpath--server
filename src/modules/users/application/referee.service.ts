import { Referee } from "../domain/referee";
import { RefereeRepository } from "../contracts/referee.interfaces";
import { CreateRefereeDTO, UpdateRefereeDTO } from "../contracts/referee.schemas";
import CustomError from "@/shared/utils/custom-error";

export class RefereeService {
  constructor(private readonly refereeRepo: RefereeRepository) {}

  async create(userId: string, dto: CreateRefereeDTO): Promise<Referee> {
    const referee = new Referee(
      crypto.randomUUID(), userId, dto.name, dto.title,
      dto.institution, dto.email, dto.phone, dto.relationship,
    );
    return this.refereeRepo.create(referee);
  }

  async findAll(userId: string): Promise<Referee[]> {
    return this.refereeRepo.findByUserId(userId);
  }

  async findOne(id: string, userId: string): Promise<Referee> {
    const referee = await this.refereeRepo.findById(id);
    if (!referee) throw new CustomError("Referee not found", 404);
    if (referee.userId !== userId) throw new CustomError("Forbidden", 403);
    return referee;
  }

  async update(id: string, userId: string, dto: UpdateRefereeDTO): Promise<Referee> {
    const referee = await this.findOne(id, userId);
    if (dto.name !== undefined) referee.name = dto.name;
    if (dto.title !== undefined) referee.title = dto.title;
    if (dto.institution !== undefined) referee.institution = dto.institution;
    if (dto.email !== undefined) referee.email = dto.email;
    if (dto.phone !== undefined) referee.phone = dto.phone;
    if (dto.relationship !== undefined) referee.relationship = dto.relationship;
    return this.refereeRepo.update(referee);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.refereeRepo.delete(id);
  }
}
