import { Inquiry } from "../domain/inquiry";
import { PaginatedResult } from "@/modules/opportunities/contracts/opportunity.interfaces";

export interface InquiryRepository {
  create(inquiry: Inquiry): Promise<Inquiry>;
  findByUserId(userId: string, page: number, limit: number): Promise<PaginatedResult<Inquiry>>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Inquiry>>;
  findById(id: string): Promise<Inquiry | null>;
  update(inquiry: Inquiry): Promise<Inquiry>;
}
