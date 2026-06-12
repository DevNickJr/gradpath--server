import { SavedOpportunity } from "@/modules/saved-opportunities/domain/saved-opportunity";
import { PaginatedResult } from "@/modules/opportunities/contracts/opportunity.interfaces";

export interface SavedOpportunityRepository {
  save(saved: SavedOpportunity): Promise<SavedOpportunity>;
  delete(userId: string, opportunityId: string): Promise<void>;
  findByUserAndOpportunity(userId: string, opportunityId: string): Promise<SavedOpportunity | null>;
  findByUserId(userId: string, page: number, limit: number): Promise<PaginatedResult<SavedOpportunity>>;
}
