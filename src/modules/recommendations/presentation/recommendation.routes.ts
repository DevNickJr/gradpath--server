import { Router } from "express";
import { RecommendationController } from "./recommendation.controller";
import { AuthGuard } from "@/shared/middlewares/auth.middleware";

export const recommendationRoutes = (controller: RecommendationController) => {
  const router = Router();

  router.get("/", AuthGuard, controller.getRecommendations);

  return router;
};
