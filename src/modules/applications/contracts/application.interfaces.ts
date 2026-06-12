import { Application } from "@/modules/applications/domain/application";
import { PaginatedResult } from "@/modules/opportunities/contracts/opportunity.interfaces";

export interface ApplicationRepository {
  create(application: Application): Promise<Application>;
  findById(id: string): Promise<Application | null>;
  findByUserId(userId: string, status: string | undefined, page: number, limit: number): Promise<PaginatedResult<Application>>;
  findByUserAndOpportunity(userId: string, opportunityId: string): Promise<Application | null>;
  update(application: Application): Promise<Application>;
  delete(id: string): Promise<void>;
}
