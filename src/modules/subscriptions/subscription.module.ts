import { AppDataSource } from "@/infrastructure/database/app-data-source";
import { SubscriptionOrmEntity } from "./infrastructure/persistence/subscription.orm-entity";
import { UsageRecordOrmEntity } from "./infrastructure/persistence/usage-record.orm-entity";
import { SubscriptionRepositoryImpl } from "./infrastructure/persistence/subscription.repository.impl";
import { UsageRecordRepositoryImpl } from "./infrastructure/persistence/usage-record.repository.impl";
import { SubscriptionService } from "./application/subscription.service";
import { UsageService } from "./application/usage.service";
import { SubscriptionController } from "./presentation/subscription.controller";
import { subscriptionRoutes } from "./presentation/subscription.routes";
import { UserOrmEntity } from "@/modules/users/infrastructure/persistence/user.orm-entity";
import { UserRepositoryImpl } from "@/modules/users/infrastructure/persistence/user.repository.impl";

const subscriptionOrmRepo = AppDataSource.getRepository(SubscriptionOrmEntity);
const usageRecordOrmRepo = AppDataSource.getRepository(UsageRecordOrmEntity);
const userOrmRepo = AppDataSource.getRepository(UserOrmEntity);

const subscriptionRepository = new SubscriptionRepositoryImpl(subscriptionOrmRepo);
const usageRecordRepository = new UsageRecordRepositoryImpl(usageRecordOrmRepo);
const userRepository = new UserRepositoryImpl(userOrmRepo);

export const usageService = new UsageService(usageRecordRepository, subscriptionRepository);

const subscriptionService = new SubscriptionService(
  subscriptionRepository,
  userRepository,
);

const subscriptionController = new SubscriptionController(
  subscriptionService,
  usageService,
);

export const subscriptionRouter = subscriptionRoutes(subscriptionController);
