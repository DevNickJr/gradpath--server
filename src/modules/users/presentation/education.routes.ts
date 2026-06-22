import { Router } from "express";
import { EducationController } from "./education.controller";
import { AuthGuard } from "@/shared/middlewares/auth.middleware";
import validateRequest from "@/shared/middlewares/validate-request";
import { CreateEducationSchema, UpdateEducationSchema } from "../contracts/education.schemas";

export const educationRoutes = (controller: EducationController) => {
  const router = Router();

  router.post("/", AuthGuard, validateRequest([CreateEducationSchema]), controller.create);
  router.get("/", AuthGuard, controller.findAll);
  router.get("/:id", AuthGuard, controller.findOne);
  router.patch("/:id", AuthGuard, validateRequest([UpdateEducationSchema]), controller.update);
  router.delete("/:id", AuthGuard, controller.delete);

  return router;
};
