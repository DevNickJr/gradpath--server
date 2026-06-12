import { ApplicationController } from "./presentation/application.controller";
import { ApplicationService } from "./application/application.service";
import { ApplicationRepositoryImpl } from "./infrastructure/persistence/application.repository.impl";
import { ApplicationOrmEntity } from "./infrastructure/persistence/application.orm-entity";
import { OpportunityRepositoryImpl } from "@/modules/opportunities/infrastructure/persistence/opportunity.repository.impl";
import { OpportunityOrmEntity } from "@/modules/opportunities/infrastructure/persistence/opportunity.orm-entity";
import { applicationRoutes } from "./presentation/application.routes";
import { AppDataSource } from "@/infrastructure/database/app-data-source";

const applicationOrmRepo = AppDataSource.getRepository(ApplicationOrmEntity);
const opportunityOrmRepo = AppDataSource.getRepository(OpportunityOrmEntity);

const applicationRepository = new ApplicationRepositoryImpl(applicationOrmRepo);
const opportunityRepository = new OpportunityRepositoryImpl(opportunityOrmRepo);

const applicationService = new ApplicationService(applicationRepository, opportunityRepository);

export const applicationController = new ApplicationController(applicationService);
export const applicationRouter = applicationRoutes(applicationController);
