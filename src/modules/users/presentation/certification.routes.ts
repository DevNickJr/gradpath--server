import { Router } from "express";
import { CertificationController } from "./certification.controller";
import { AuthGuard } from "@/shared/middlewares/auth.middleware";
import validateRequest from "@/shared/middlewares/validate-request";
import { CreateCertificationSchema, UpdateCertificationSchema } from "../contracts/certification.schemas";

export const certificationRoutes = (controller: CertificationController) => {
  const router = Router();
  router.post("/", AuthGuard, validateRequest([CreateCertificationSchema]), controller.create);
  router.get("/", AuthGuard, controller.findAll);
  router.get("/:id", AuthGuard, controller.findOne);
  router.patch("/:id", AuthGuard, validateRequest([UpdateCertificationSchema]), controller.update);
  router.delete("/:id", AuthGuard, controller.delete);
  return router;
};
