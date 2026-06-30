import { Router } from "express";
import { SubscriptionController } from "./subscription.controller";
import { AuthGuard } from "@/shared/middlewares/auth.middleware";
import validateRequest from "@/shared/middlewares/validate-request";
import { InitiateCheckoutSchema } from "../contracts/subscription.schemas";

export const subscriptionRoutes = (controller: SubscriptionController) => {
  const router = Router();

  router.post(
    "/checkout",
    AuthGuard,
    validateRequest([InitiateCheckoutSchema]),
    controller.initiateCheckout,
  );

  // Flutterwave webhook - no AuthGuard, verified by hash
  router.post("/webhook", controller.handleWebhook);

  router.get("/status", AuthGuard, controller.getStatus);

  router.get("/usage", AuthGuard, controller.getUsage);

  return router;
};
