import { Router } from "express";
import { AwardController } from "./award.controller";
import { AuthGuard } from "@/shared/middlewares/auth.middleware";
import validateRequest from "@/shared/middlewares/validate-request";
import { CreateAwardSchema, UpdateAwardSchema } from "../contracts/award.schemas";

export const awardRoutes = (controller: AwardController) => {
  const router = Router();
  router.post("/", AuthGuard, validateRequest([CreateAwardSchema]), controller.create);
  router.get("/", AuthGuard, controller.findAll);
  router.get("/:id", AuthGuard, controller.findOne);
  router.patch("/:id", AuthGuard, validateRequest([UpdateAwardSchema]), controller.update);
  router.delete("/:id", AuthGuard, controller.delete);
  return router;
};
