import { Publication } from "../domain/publication";
import { PublicationRepository } from "../contracts/publication.interfaces";
import { CreatePublicationDTO, UpdatePublicationDTO } from "../contracts/publication.schemas";
import CustomError from "@/shared/utils/custom-error";

export class PublicationService {
  constructor(private readonly publicationRepo: PublicationRepository) {}

  async create(userId: string, dto: CreatePublicationDTO): Promise<Publication> {
    const pub = new Publication(
      crypto.randomUUID(), userId, dto.title, dto.journal,
      dto.date ? new Date(dto.date) : undefined, dto.authors, dto.url, dto.type as any,
    );
    return this.publicationRepo.create(pub);
  }

  async findAll(userId: string): Promise<Publication[]> {
    return this.publicationRepo.findByUserId(userId);
  }

  async findOne(id: string, userId: string): Promise<Publication> {
    const pub = await this.publicationRepo.findById(id);
    if (!pub) throw new CustomError("Publication not found", 404);
    if (pub.userId !== userId) throw new CustomError("Forbidden", 403);
    return pub;
  }

  async update(id: string, userId: string, dto: UpdatePublicationDTO): Promise<Publication> {
    const pub = await this.findOne(id, userId);
    if (dto.title !== undefined) pub.title = dto.title;
    if (dto.journal !== undefined) pub.journal = dto.journal;
    if (dto.date !== undefined) pub.date = new Date(dto.date);
    if (dto.authors !== undefined) pub.authors = dto.authors;
    if (dto.url !== undefined) pub.url = dto.url;
    if (dto.type !== undefined) pub.type = dto.type as any;
    return this.publicationRepo.update(pub);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.publicationRepo.delete(id);
  }
}
