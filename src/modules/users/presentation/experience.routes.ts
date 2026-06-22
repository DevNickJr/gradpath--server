import { Router } from "express";
import { ExperienceController } from "./experience.controller";
import { AuthGuard } from "@/shared/middlewares/auth.middleware";
import validateRequest from "@/shared/middlewares/validate-request";
import { CreateExperienceSchema, UpdateExperienceSchema } from "../contracts/experience.schemas";

export const experienceRoutes = (controller: ExperienceController) => {
  const router = Router();

  router.post("/", AuthGuard, validateRequest([CreateExperienceSchema]), controller.create);
  router.get("/", AuthGuard, controller.findAll);
  router.get("/:id", AuthGuard, controller.findOne);
  router.patch("/:id", AuthGuard, validateRequest([UpdateExperienceSchema]), controller.update);
  router.delete("/:id", AuthGuard, controller.delete);

  return router;
};
