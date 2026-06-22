import { CommentController } from "./presentation/comment.controller";
import { CommentService } from "./application/comment.service";
import { CommentRepositoryImpl } from "./infrastructure/persistence/comment.repository.impl";
import { CommentOrmEntity } from "./infrastructure/persistence/comment.orm-entity";
import { OpportunityRepositoryImpl } from "@/modules/opportunities/infrastructure/persistence/opportunity.repository.impl";
import { OpportunityOrmEntity } from "@/modules/opportunities/infrastructure/persistence/opportunity.orm-entity";
import { commentRoutes } from "./presentation/comment.routes";
import { AppDataSource } from "@/infrastructure/database/app-data-source";

const commentOrmRepo = AppDataSource.getRepository(CommentOrmEntity);
const opportunityOrmRepo = AppDataSource.getRepository(OpportunityOrmEntity);

const commentRepository = new CommentRepositoryImpl(commentOrmRepo);
const opportunityRepository = new OpportunityRepositoryImpl(opportunityOrmRepo);

const commentService = new CommentService(commentRepository, opportunityRepository);
const commentController = new CommentController(commentService);

export const commentRouter = commentRoutes(commentController);
