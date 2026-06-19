import { Router } from "express";
import { UserController } from "./user.controller";
import { AuthGuard, RoleGuard } from "@/shared/middlewares/auth.middleware";
import { RolesEnum } from "../contracts/user.interfaces";
import validateRequest from "@/shared/middlewares/validate-request";
import { UpdateRoleSchema } from "../contracts/user.schemas";

export const userRoutes = (controller: UserController) => {
  const router = Router();

  router.get("/me", AuthGuard, controller.getMe);
  router.put("/me", AuthGuard, controller.updateProfile);
  router.patch("/update-role", AuthGuard, RoleGuard([RolesEnum.ADMIN]), validateRequest([UpdateRoleSchema]), controller.makeAdminOrAgent);
  router.get("/:id", AuthGuard, controller.get);

  return router;
};
