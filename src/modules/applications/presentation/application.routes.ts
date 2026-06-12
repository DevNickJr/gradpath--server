import { Router } from "express";
import { ApplicationController } from "./application.controller";
import { AuthGuard } from "@/shared/middlewares/auth.middleware";
import validateRequest from "@/shared/middlewares/validate-request";
import { CreateApplicationSchema, UpdateApplicationSchema } from "../contracts/application.schemas";
import { IdParam } from "@/shared/schemas";

export const applicationRoutes = (controller: ApplicationController) => {
  const router = Router();

  router.post("/", AuthGuard, validateRequest([CreateApplicationSchema]), controller.create);
  router.get("/", AuthGuard, controller.getAll);
  router.get("/:id", AuthGuard, controller.getOne);
  router.patch("/:id", AuthGuard, validateRequest([UpdateApplicationSchema, IdParam]), controller.update);
  router.delete("/:id", AuthGuard, validateRequest([IdParam]), controller.delete);

  return router;
};
