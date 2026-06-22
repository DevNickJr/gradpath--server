import { InquiryController } from "./presentation/inquiry.controller";
import { InquiryService } from "./application/inquiry.service";
import { InquiryRepositoryImpl } from "./infrastructure/persistence/inquiry.repository.impl";
import { InquiryOrmEntity } from "./infrastructure/persistence/inquiry.orm-entity";
import { inquiryRoutes } from "./presentation/inquiry.routes";
import { AppDataSource } from "@/infrastructure/database/app-data-source";

const inquiryOrmRepo = AppDataSource.getRepository(InquiryOrmEntity);
const inquiryRepository = new InquiryRepositoryImpl(inquiryOrmRepo);
const inquiryService = new InquiryService(inquiryRepository);
const inquiryController = new InquiryController(inquiryService);

export const inquiryRouter = inquiryRoutes(inquiryController);
