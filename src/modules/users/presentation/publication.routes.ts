import { Router } from "express";
import { PublicationController } from "./publication.controller";
import { AuthGuard } from "@/shared/middlewares/auth.middleware";
import validateRequest from "@/shared/middlewares/validate-request";
import { CreatePublicationSchema, UpdatePublicationSchema } from "../contracts/publication.schemas";

export const publicationRoutes = (controller: PublicationController) => {
  const router = Router();
  router.post("/", AuthGuard, validateRequest([CreatePublicationSchema]), controller.create);
  router.get("/", AuthGuard, controller.findAll);
  router.get("/:id", AuthGuard, controller.findOne);
  router.patch("/:id", AuthGuard, validateRequest([UpdatePublicationSchema]), controller.update);
  router.delete("/:id", AuthGuard, controller.delete);
  return router;
};
