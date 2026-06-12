import { Opportunity, OpportunityType, DegreeLevel, FundingType } from "../../domain/opportunity";
import { OpportunityOrmEntity } from "./opportunity.orm-entity";

export class OpportunityMapper {
  static toDomain(entity: OpportunityOrmEntity): Opportunity {
    return new Opportunity(
      entity.id,
      entity.title,
      entity.description,
      entity.university,
      entity.country,
      entity.opportunityType as OpportunityType,
      entity.degreeLevel as DegreeLevel,
      entity.fieldsOfStudy || [],
      entity.fundingType as FundingType,
      entity.benefits || [],
      entity.deadline,
      entity.applicationLink,
      entity.sourceUrl,
      entity.isActive,
      entity.isFeatured,
      entity.createdById,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(opp: Opportunity): OpportunityOrmEntity {
    const entity = new OpportunityOrmEntity();
    entity.id = opp.id;
    entity.title = opp.title;
    entity.description = opp.description;
    entity.university = opp.university;
    entity.country = opp.country;
    entity.opportunityType = opp.opportunityType;
    entity.degreeLevel = opp.degreeLevel;
    entity.fieldsOfStudy = opp.fieldsOfStudy;
    entity.fundingType = opp.fundingType;
    entity.benefits = opp.benefits;
    entity.deadline = opp.deadline;
    entity.applicationLink = opp.applicationLink;
    entity.sourceUrl = opp.sourceUrl;
    entity.isActive = opp.isActive;
    entity.isFeatured = opp.isFeatured;
    entity.createdById = opp.createdById;
    entity.createdAt = opp.createdAt;
    entity.updatedAt = opp.updatedAt;
    return entity;
  }
}
