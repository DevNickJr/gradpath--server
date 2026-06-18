import { Opportunity } from "@/modules/opportunities/domain/opportunity";

export class SavedOpportunity {
  constructor(
    public readonly id: string,
    public userId: string,
    public opportunityId: string,
    public createdAt: Date = new Date(),
    public opportunity?: Opportunity,
  ) {}
}
