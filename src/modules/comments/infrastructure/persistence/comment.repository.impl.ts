import { Repository, IsNull } from "typeorm";
import { CommentRepository } from "../../contracts/comment.interfaces";
import { Comment } from "../../domain/comment";
import { PaginatedResult } from "@/modules/opportunities/contracts/opportunity.interfaces";
import { CommentOrmEntity } from "./comment.orm-entity";
import { CommentMapper } from "./comment.mapper";

export class CommentRepositoryImpl implements CommentRepository {
  constructor(private readonly ormRepo: Repository<CommentOrmEntity>) {}

  async create(comment: Comment): Promise<Comment> {
    const entity = CommentMapper.toPersistence(comment);
    const saved = await this.ormRepo.save(entity);
    // Reload with relations
    const full = await this.ormRepo.findOne({
      where: { id: saved.id },
      relations: { user: { profile: true }, replies: { user: { profile: true } } },
    });
    return CommentMapper.toDomain(full!);
  }

  async findByOpportunityId(opportunityId: string, page: number, limit: number): Promise<PaginatedResult<Comment>> {
    const [entities, total] = await this.ormRepo.findAndCount({
      where: { opportunityId, parentId: IsNull() },
      relations: { user: { profile: true }, replies: { user: { profile: true } } },
      order: { createdAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: entities.map(CommentMapper.toDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<Comment | null> {
    const entity = await this.ormRepo.findOne({
      where: { id },
      relations: { user: { profile: true }, replies: { user: { profile: true } } },
    });
    if (!entity) return null;
    return CommentMapper.toDomain(entity);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
