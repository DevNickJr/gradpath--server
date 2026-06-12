import { Document } from "@/modules/documents/domain/document";
import { PaginatedResult } from "@/modules/opportunities/contracts/opportunity.interfaces";

export interface DocumentRepository {
  create(document: Document): Promise<Document>;
  findById(id: string): Promise<Document | null>;
  findByUserId(userId: string, page: number, limit: number): Promise<PaginatedResult<Document>>;
  update(document: Document): Promise<Document>;
  delete(id: string): Promise<void>;
}
