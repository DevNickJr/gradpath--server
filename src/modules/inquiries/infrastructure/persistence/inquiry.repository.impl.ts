import { Repository, IsNull } from "typeorm";
import { InquiryRepository } from "../../contracts/inquiry.interfaces";
import { Inquiry } from "../../domain/inquiry";
import { PaginatedResult } from "@/modules/opportunities/contracts/opportunity.interfaces";
import { InquiryOrmEntity } from "./inquiry.orm-entity";
import { InquiryMapper } from "./inquiry.mapper";

export class InquiryRepositoryImpl implements InquiryRepository {
  constructor(private readonly ormRepo: Repository<InquiryOrmEntity>) {}

  async create(inquiry: Inquiry): Promise<Inquiry> {
    const entity = InquiryMapper.toPersistence(inquiry);
    const saved = await this.ormRepo.save(entity);
    const full = await this.ormRepo.findOne({
      where: { id: saved.id },
      relations: { user: { profile: true }, replies: { user: { profile: true } } },
    });
    return InquiryMapper.toDomain(full!);
  }

  async findByUserId(userId: string, page: number, limit: number): Promise<PaginatedResult<Inquiry>> {
    const [entities, total] = await this.ormRepo.findAndCount({
      where: { userId, parentId: IsNull() },
      relations: { user: { profile: true }, replies: { user: { profile: true } } },
      order: { createdAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: entities.map(InquiryMapper.toDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findAll(page: number, limit: number): Promise<PaginatedResult<Inquiry>> {
    const [entities, total] = await this.ormRepo.findAndCount({
      where: { parentId: IsNull() },
      relations: { user: { profile: true }, replies: { user: { profile: true } } },
      order: { createdAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: entities.map(InquiryMapper.toDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<Inquiry | null> {
    const entity = await this.ormRepo.findOne({
      where: { id },
      relations: { user: { profile: true }, replies: { user: { profile: true } } },
    });
    if (!entity) return null;
    return InquiryMapper.toDomain(entity);
  }

  async update(inquiry: Inquiry): Promise<Inquiry> {
    const entity = InquiryMapper.toPersistence(inquiry);
    const saved = await this.ormRepo.save(entity);
    const full = await this.ormRepo.findOne({
      where: { id: saved.id },
      relations: { user: { profile: true }, replies: { user: { profile: true } } },
    });
    return InquiryMapper.toDomain(full!);
  }
}
