import { Router } from "express";
import { DocumentController } from "./document.controller";
import { AuthGuard } from "@/shared/middlewares/auth.middleware";
import validateRequest from "@/shared/middlewares/validate-request";
import { GenerateDocumentSchema } from "../contracts/document.schemas";

export const documentRoutes = (controller: DocumentController) => {
  const router = Router();

  router.post("/generate", AuthGuard, validateRequest([GenerateDocumentSchema]), controller.generate);
  router.get("/", AuthGuard, controller.getAll);
  router.get("/:id", AuthGuard, controller.getOne);
  router.delete("/:id", AuthGuard, controller.delete);

  return router;
};
