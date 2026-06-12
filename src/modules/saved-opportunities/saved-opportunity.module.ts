import { SavedOpportunityController } from "./presentation/saved-opportunity.controller";
import { SavedOpportunityService } from "./application/saved-opportunity.service";
import { SavedOpportunityRepositoryImpl } from "./infrastructure/persistence/saved-opportunity.repository.impl";
import { SavedOpportunityOrmEntity } from "./infrastructure/persistence/saved-opportunity.orm-entity";
import { savedOpportunityRoutes } from "./presentation/saved-opportunity.routes";
import { AppDataSource } from "@/infrastructure/database/app-data-source";

const ormRepo =
  AppDataSource.getRepository(SavedOpportunityOrmEntity);

const savedOpportunityRepository =
  new SavedOpportunityRepositoryImpl(ormRepo);

const savedOpportunityService =
  new SavedOpportunityService(savedOpportunityRepository);

export const savedOpportunityController =
  new SavedOpportunityController(savedOpportunityService);

export const savedOpportunityRouter =
  savedOpportunityRoutes(savedOpportunityController);
