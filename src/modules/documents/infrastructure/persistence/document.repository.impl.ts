import { Repository } from "typeorm";
import { DocumentRepository } from "@/modules/documents/contracts/document.interfaces";
import { Document } from "@/modules/documents/domain/document";
import { PaginatedResult } from "@/modules/opportunities/contracts/opportunity.interfaces";
import { DocumentOrmEntity } from "./document.orm-entity";
import { DocumentMapper } from "./document.mapper";

export class DocumentRepositoryImpl implements DocumentRepository {
  constructor(private readonly ormRepo: Repository<DocumentOrmEntity>) {}

  async create(document: Document): Promise<Document> {
    const entity = DocumentMapper.toPersistence(document);
    const saved = await this.ormRepo.save(entity);
    return DocumentMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Document | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;
    return DocumentMapper.toDomain(entity);
  }

  async findByUserId(userId: string, page: number, limit: number): Promise<PaginatedResult<Document>> {
    const [entities, total] = await this.ormRepo.findAndCount({
      where: { userId },
      order: { createdAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: entities.map(DocumentMapper.toDomain),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(document: Document): Promise<Document> {
    const entity = DocumentMapper.toPersistence(document);
    const updated = await this.ormRepo.save(entity);
    return DocumentMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
