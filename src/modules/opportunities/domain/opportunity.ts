export enum OpportunityType {
  SCHOLARSHIP = "scholarship",
  FELLOWSHIP = "fellowship",
  ASSISTANTSHIP = "assistantship",
  FUNDED_PROGRAM = "funded_program",
  GRANT = "grant",
}

export enum DegreeLevel {
  BACHELORS = "bachelors",
  MASTERS = "masters",
  PHD = "phd",
  POSTDOC = "postdoc",
}

export enum FundingType {
  FULLY_FUNDED = "fully_funded",
  PARTIALLY_FUNDED = "partially_funded",
  SELF_FUNDED = "self_funded",
}

export class Opportunity {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public university: string,
    public country: string,
    public opportunityType: OpportunityType,
    public degreeLevel: DegreeLevel,
    public fieldsOfStudy: string[] = [],
    public fundingType: FundingType,
    public benefits: string[] = [],
    public deadline: Date,
    public applicationLink: string,
    public sourceUrl?: string,
    public isActive: boolean = true,
    public isFeatured: boolean = false,
    public createdById: string = "",
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
