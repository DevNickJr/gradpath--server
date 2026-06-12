import { OpportunityController } from "./presentation/opportunity.controller";
import { OpportunityService } from "./application/opportunity.service";
import { OpportunityRepositoryImpl } from "./infrastructure/persistence/opportunity.repository.impl";
import { OpportunityOrmEntity } from "./infrastructure/persistence/opportunity.orm-entity";
import { opportunityRoutes } from "./presentation/opportunity.routes";
import { AppDataSource } from "@/infrastructure/database/app-data-source";

const ormRepo =
  AppDataSource.getRepository(OpportunityOrmEntity);

const opportunityRepository =
  new OpportunityRepositoryImpl(ormRepo);

const opportunityService =
  new OpportunityService(opportunityRepository);

export const opportunityController =
  new OpportunityController(opportunityService);

export const opportunityRouter =
  opportunityRoutes(opportunityController);
