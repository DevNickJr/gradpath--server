import { Router } from "express";
import { OpportunityController } from "./opportunity.controller";
import { AuthGuard, RoleGuard } from "@/shared/middlewares/auth.middleware";
import { RolesEnum } from "@/modules/users/contracts/user.interfaces";
import validateRequest from "@/shared/middlewares/validate-request";
import { CreateOpportunitySchema, UpdateOpportunitySchema, SearchOpportunityQuerySchema } from "../contracts/opportunity.schemas";
import { IdParam } from "@/shared/schemas";

export const opportunityRoutes = (controller: OpportunityController) => {
  const router = Router();
  
  // Public
  router.get("/", validateRequest([SearchOpportunityQuerySchema]), controller.search);
  
  // Admin only
  router.post(
    "/",
    AuthGuard,
    RoleGuard([RolesEnum.ADMIN, RolesEnum.AGENT]),
    validateRequest([CreateOpportunitySchema]),
    controller.create
  );
  
  router.patch(
    "/:id",
    AuthGuard,
    RoleGuard([RolesEnum.ADMIN]),
    validateRequest([UpdateOpportunitySchema, IdParam]),
    controller.update
  );
  
  router.delete(
    "/:id",
    AuthGuard,
    RoleGuard([RolesEnum.ADMIN, RolesEnum.AGENT]),
    validateRequest([IdParam]),
    controller.delete
  );
  
  // Public (after specific routes)
  router.get(
    "/:id",
    validateRequest([IdParam]),
    controller.getOne
  );
  
  return router;
};
