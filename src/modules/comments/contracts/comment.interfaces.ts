import { Comment } from "../domain/comment";
import { PaginatedResult } from "@/modules/opportunities/contracts/opportunity.interfaces";

export interface CommentRepository {
  create(comment: Comment): Promise<Comment>;
  findByOpportunityId(opportunityId: string, page: number, limit: number): Promise<PaginatedResult<Comment>>;
  findById(id: string): Promise<Comment | null>;
  delete(id: string): Promise<void>;
}
