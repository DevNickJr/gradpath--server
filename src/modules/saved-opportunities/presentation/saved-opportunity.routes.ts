import { Router } from "express";
import { SavedOpportunityController } from "./saved-opportunity.controller";
import { AuthGuard } from "@/shared/middlewares/auth.middleware";

export const savedOpportunityRoutes = (controller: SavedOpportunityController) => {
  const router = Router();

  router.post("/", AuthGuard, controller.toggleSave);
  router.get("/", AuthGuard, controller.getMyList);
  router.get("/:opportunityId/status", AuthGuard, controller.checkStatus);

  return router;
};
