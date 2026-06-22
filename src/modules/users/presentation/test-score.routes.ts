import { Router } from "express";
import { TestScoreController } from "./test-score.controller";
import { AuthGuard } from "@/shared/middlewares/auth.middleware";
import validateRequest from "@/shared/middlewares/validate-request";
import { CreateTestScoreSchema, UpdateTestScoreSchema } from "../contracts/test-score.schemas";

export const testScoreRoutes = (controller: TestScoreController) => {
  const router = Router();
  router.post("/", AuthGuard, validateRequest([CreateTestScoreSchema]), controller.create);
  router.get("/", AuthGuard, controller.findAll);
  router.get("/:id", AuthGuard, controller.findOne);
  router.patch("/:id", AuthGuard, validateRequest([UpdateTestScoreSchema]), controller.update);
  router.delete("/:id", AuthGuard, controller.delete);
  return router;
};
