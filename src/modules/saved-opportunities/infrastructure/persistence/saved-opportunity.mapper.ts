import { SavedOpportunity } from "../../domain/saved-opportunity";
import { SavedOpportunityOrmEntity } from "./saved-opportunity.orm-entity";

export class SavedOpportunityMapper {
  static toDomain(entity: SavedOpportunityOrmEntity): SavedOpportunity {
    return new SavedOpportunity(entity.id, entity.userId, entity.opportunityId, entity.createdAt);
  }

  static toPersistence(saved: SavedOpportunity): SavedOpportunityOrmEntity {
    const entity = new SavedOpportunityOrmEntity();
    entity.id = saved.id;
    entity.userId = saved.userId;
    entity.opportunityId = saved.opportunityId;
    entity.createdAt = saved.createdAt;
    return entity;
  }
}
