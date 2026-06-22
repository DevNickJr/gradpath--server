import { UserController } from "./presentation/user.controller";
import { UserService } from "./application/user.service";
import { UserRepositoryImpl } from "./infrastructure/persistence/user.repository.impl";
import { UserOrmEntity } from "./infrastructure/persistence/user.orm-entity";
import { userRoutes } from "./presentation/user.routes";

import { EducationController } from "./presentation/education.controller";
import { EducationService } from "./application/education.service";
import { EducationRepositoryImpl } from "./infrastructure/persistence/education.repository.impl";
import { EducationOrmEntity } from "./infrastructure/persistence/education.orm-entity";
import { educationRoutes } from "./presentation/education.routes";

import { ExperienceController } from "./presentation/experience.controller";
import { ExperienceService } from "./application/experience.service";
import { ExperienceRepositoryImpl } from "./infrastructure/persistence/experience.repository.impl";
import { ExperienceOrmEntity } from "./infrastructure/persistence/experience.orm-entity";
import { experienceRoutes } from "./presentation/experience.routes";

import { PublicationController } from "./presentation/publication.controller";
import { PublicationService } from "./application/publication.service";
import { PublicationRepositoryImpl } from "./infrastructure/persistence/publication.repository.impl";
import { PublicationOrmEntity } from "./infrastructure/persistence/publication.orm-entity";
import { publicationRoutes } from "./presentation/publication.routes";

import { TestScoreController } from "./presentation/test-score.controller";
import { TestScoreService } from "./application/test-score.service";
import { TestScoreRepositoryImpl } from "./infrastructure/persistence/test-score.repository.impl";
import { TestScoreOrmEntity } from "./infrastructure/persistence/test-score.orm-entity";
import { testScoreRoutes } from "./presentation/test-score.routes";

import { CertificationController } from "./presentation/certification.controller";
import { CertificationService } from "./application/certification.service";
import { CertificationRepositoryImpl } from "./infrastructure/persistence/certification.repository.impl";
import { CertificationOrmEntity } from "./infrastructure/persistence/certification.orm-entity";
import { certificationRoutes } from "./presentation/certification.routes";

import { AwardController } from "./presentation/award.controller";
import { AwardService } from "./application/award.service";
import { AwardRepositoryImpl } from "./infrastructure/persistence/award.repository.impl";
import { AwardOrmEntity } from "./infrastructure/persistence/award.orm-entity";
import { awardRoutes } from "./presentation/award.routes";

import { RefereeController } from "./presentation/referee.controller";
import { RefereeService } from "./application/referee.service";
import { RefereeRepositoryImpl } from "./infrastructure/persistence/referee.repository.impl";
import { RefereeOrmEntity } from "./infrastructure/persistence/referee.orm-entity";
import { refereeRoutes } from "./presentation/referee.routes";

import { AppDataSource } from "@/infrastructure/database/app-data-source";

// User
const ormRepo = AppDataSource.getRepository(UserOrmEntity);
const userRepository = new UserRepositoryImpl(ormRepo);
const userService = new UserService(userRepository);
export const userController = new UserController(userService);
export const userRouter = userRoutes(userController);

// Education
const educationOrmRepo = AppDataSource.getRepository(EducationOrmEntity);
const educationRepository = new EducationRepositoryImpl(educationOrmRepo);
const educationService = new EducationService(educationRepository);
const educationController = new EducationController(educationService);
export const educationRouter = educationRoutes(educationController);

// Experience
const experienceOrmRepo = AppDataSource.getRepository(ExperienceOrmEntity);
const experienceRepository = new ExperienceRepositoryImpl(experienceOrmRepo);
const experienceService = new ExperienceService(experienceRepository);
const experienceController = new ExperienceController(experienceService);
export const experienceRouter = experienceRoutes(experienceController);

// Publication
const publicationOrmRepo = AppDataSource.getRepository(PublicationOrmEntity);
const publicationRepository = new PublicationRepositoryImpl(publicationOrmRepo);
const publicationService = new PublicationService(publicationRepository);
const publicationController = new PublicationController(publicationService);
export const publicationRouter = publicationRoutes(publicationController);

// TestScore
const testScoreOrmRepo = AppDataSource.getRepository(TestScoreOrmEntity);
const testScoreRepository = new TestScoreRepositoryImpl(testScoreOrmRepo);
const testScoreService = new TestScoreService(testScoreRepository);
const testScoreController = new TestScoreController(testScoreService);
export const testScoreRouter = testScoreRoutes(testScoreController);

// Certification
const certificationOrmRepo = AppDataSource.getRepository(CertificationOrmEntity);
const certificationRepository = new CertificationRepositoryImpl(certificationOrmRepo);
const certificationService = new CertificationService(certificationRepository);
const certificationController = new CertificationController(certificationService);
export const certificationRouter = certificationRoutes(certificationController);

// Award
const awardOrmRepo = AppDataSource.getRepository(AwardOrmEntity);
const awardRepository = new AwardRepositoryImpl(awardOrmRepo);
const awardService = new AwardService(awardRepository);
const awardController = new AwardController(awardService);
export const awardRouter = awardRoutes(awardController);

// Referee
const refereeOrmRepo = AppDataSource.getRepository(RefereeOrmEntity);
const refereeRepository = new RefereeRepositoryImpl(refereeOrmRepo);
const refereeService = new RefereeService(refereeRepository);
const refereeController = new RefereeController(refereeService);
export const refereeRouter = refereeRoutes(refereeController);

// Export repositories for use by other modules (e.g., documents)
export {
  educationRepository,
  experienceRepository,
  publicationRepository,
  testScoreRepository,
  certificationRepository,
  awardRepository,
  refereeRepository,
};
