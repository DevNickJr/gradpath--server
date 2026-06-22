import { Router } from "express";
import { InquiryController } from "./inquiry.controller";
import { AuthGuard, RoleGuard } from "@/shared/middlewares/auth.middleware";
import { RolesEnum } from "@/modules/users/contracts/user.interfaces";
import validateRequest from "@/shared/middlewares/validate-request";
import { CreateInquirySchema, ReplyInquirySchema, UpdateInquiryStatusSchema } from "../contracts/inquiry.schemas";

export const inquiryRoutes = (controller: InquiryController) => {
  const router = Router();

  router.post("/", AuthGuard, validateRequest([CreateInquirySchema]), controller.create);
  router.get("/", AuthGuard, controller.getMyInquiries);
  router.get("/all", AuthGuard, RoleGuard([RolesEnum.ADMIN, RolesEnum.AGENT]), controller.getAllInquiries);
  router.get("/:id", AuthGuard, controller.getOne);
  router.post("/:id/reply", AuthGuard, validateRequest([ReplyInquirySchema]), controller.reply);
  router.patch("/:id/status", AuthGuard, RoleGuard([RolesEnum.ADMIN, RolesEnum.AGENT]), validateRequest([UpdateInquiryStatusSchema]), controller.updateStatus);

  return router;
};
