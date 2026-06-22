import { Router } from "express";
import { CommentController } from "./comment.controller";
import { AuthGuard } from "@/shared/middlewares/auth.middleware";
import validateRequest from "@/shared/middlewares/validate-request";
import { CreateCommentSchema } from "../contracts/comment.schemas";

export const commentRoutes = (controller: CommentController) => {
  const router = Router({ mergeParams: true });

  router.get("/", controller.getByOpportunity);
  router.post("/", AuthGuard, validateRequest([CreateCommentSchema]), controller.create);
  router.delete("/:id", AuthGuard, controller.delete);

  return router;
};
