import { Opportunity } from "@/modules/opportunities/domain/opportunity";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OpportunitySearchFilters {
  country?: string;
  degreeLevel?: string;
  opportunityType?: string;
  fundingType?: string;
  fieldsOfStudy?: string[];
  search?: string;
  deadlineBefore?: Date;
  deadlineAfter?: Date;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "deadline" | "createdAt";
  sortOrder?: "ASC" | "DESC";
}

export interface OpportunityRepository {
  create(opportunity: Opportunity): Promise<Opportunity>;
  findById(id: string): Promise<Opportunity | null>;
  update(opportunity: Opportunity): Promise<Opportunity>;
  delete(id: string): Promise<void>;
  search(filters: OpportunitySearchFilters): Promise<PaginatedResult<Opportunity>>;
}
