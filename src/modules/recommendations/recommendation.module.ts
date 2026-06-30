import { AppDataSource } from "@/infrastructure/database/app-data-source";
import { OpportunityOrmEntity } from "@/modules/opportunities/infrastructure/persistence/opportunity.orm-entity";
import { OpportunityRepositoryImpl } from "@/modules/opportunities/infrastructure/persistence/opportunity.repository.impl";
import { UserOrmEntity } from "@/modules/users/infrastructure/persistence/user.orm-entity";
import { UserRepositoryImpl } from "@/modules/users/infrastructure/persistence/user.repository.impl";
import { usageService } from "@/modules/subscriptions/subscription.module";
import { RecommendationService } from "./application/recommendation.service";
import { RecommendationController } from "./presentation/recommendation.controller";
import { recommendationRoutes } from "./presentation/recommendation.routes";

const opportunityOrmRepo = AppDataSource.getRepository(OpportunityOrmEntity);
const userOrmRepo = AppDataSource.getRepository(UserOrmEntity);

const opportunityRepository = new OpportunityRepositoryImpl(opportunityOrmRepo);
const userRepository = new UserRepositoryImpl(userOrmRepo);

const recommendationService = new RecommendationService(
  opportunityRepository,
  userRepository,
  usageService,
);

const recommendationController = new RecommendationController(recommendationService);

export const recommendationRouter = recommendationRoutes(recommendationController);
