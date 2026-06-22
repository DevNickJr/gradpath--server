import { Router } from "express";
import { RefereeController } from "./referee.controller";
import { AuthGuard } from "@/shared/middlewares/auth.middleware";
import validateRequest from "@/shared/middlewares/validate-request";
import { CreateRefereeSchema, UpdateRefereeSchema } from "../contracts/referee.schemas";

export const refereeRoutes = (controller: RefereeController) => {
  const router = Router();
  router.post("/", AuthGuard, validateRequest([CreateRefereeSchema]), controller.create);
  router.get("/", AuthGuard, controller.findAll);
  router.get("/:id", AuthGuard, controller.findOne);
  router.patch("/:id", AuthGuard, validateRequest([UpdateRefereeSchema]), controller.update);
  router.delete("/:id", AuthGuard, controller.delete);
  return router;
};
