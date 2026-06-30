import { DocumentController } from "./presentation/document.controller";
import { DocumentService } from "./application/document.service";
import { DocumentRepositoryImpl } from "./infrastructure/persistence/document.repository.impl";
import { DocumentOrmEntity } from "./infrastructure/persistence/document.orm-entity";
import { UserRepositoryImpl } from "@/modules/users/infrastructure/persistence/user.repository.impl";
import { UserOrmEntity } from "@/modules/users/infrastructure/persistence/user.orm-entity";
import { OpportunityRepositoryImpl } from "@/modules/opportunities/infrastructure/persistence/opportunity.repository.impl";
import { OpportunityOrmEntity } from "@/modules/opportunities/infrastructure/persistence/opportunity.orm-entity";
import { documentRoutes } from "./presentation/document.routes";
import { AppDataSource } from "@/infrastructure/database/app-data-source";

import {
  educationRepository,
  experienceRepository,
  publicationRepository,
  testScoreRepository,
  certificationRepository,
  awardRepository,
  refereeRepository,
} from "@/modules/users/user.module";
import { usageService } from "@/modules/subscriptions/subscription.module";

const documentOrmRepo = AppDataSource.getRepository(DocumentOrmEntity);
const userOrmRepo = AppDataSource.getRepository(UserOrmEntity);
const opportunityOrmRepo = AppDataSource.getRepository(OpportunityOrmEntity);

const documentRepository = new DocumentRepositoryImpl(documentOrmRepo);
const userRepository = new UserRepositoryImpl(userOrmRepo);
const opportunityRepository = new OpportunityRepositoryImpl(opportunityOrmRepo);

const documentService = new DocumentService(
  documentRepository,
  userRepository,
  opportunityRepository,
  educationRepository,
  experienceRepository,
  publicationRepository,
  testScoreRepository,
  certificationRepository,
  awardRepository,
  refereeRepository,
  usageService,
);

export const documentController = new DocumentController(documentService);
export const documentRouter = documentRoutes(documentController);
