import crypto from "crypto";
import axios from "axios";
import { Subscription, SubscriptionPlan, SubscriptionStatus } from "../domain/subscription";
import { SubscriptionRepository } from "../contracts/subscription.interfaces";
import { InitiateCheckoutDTO } from "../contracts/subscription.schemas";
import { UserRepository } from "@/modules/users/contracts/user.interfaces";
import CustomError from "@/shared/utils/custom-error";
import logger from "@/shared/utils/logger";
import env from "@/configs/env.config";

const PLAN_PRICES: Record<string, { amount: number; currency: string }> = {
  basic: { amount: 2.99, currency: "USD" },
  pro: { amount: 9.99, currency: "USD" },
};

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async initiateCheckout(userId: string, dto: InitiateCheckoutDTO): Promise<{ checkoutUrl: string }> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new CustomError("User not found", 404);

    if (user.subscriptionPlan === dto.plan) {
      throw new CustomError("You are already subscribed to this plan", 400);
    }

    const planConfig = PLAN_PRICES[dto.plan];
    if (!planConfig) throw new CustomError("Invalid plan", 400);

    const txRef = `gradpath-${userId}-${Date.now()}`;

    try {
      const response = await axios.post(
        "https://api.flutterwave.com/v3/payments",
        {
          tx_ref: txRef,
          amount: planConfig.amount, // in usd (not cents)
          currency: planConfig.currency,
          redirect_url: dto.redirectUrl,
          customer: {
            email: user.email,
            name: user.profile?.firstName || user.email,
          },
          customizations: {
            title: `GradPath ${dto.plan}`,
            description: `GradPath ${dto.plan} monthly subscription`,
          },
          meta: {
            userId: user.id,
            plan: dto.plan,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${env.FLUTTERWAVE_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.status !== "success") {
        throw new CustomError("Failed to initiate payment", 500);
      }

      return { checkoutUrl: response.data.data.link };
    } catch (error: any) {
      logger.error(`Flutterwave checkout error: ${error.message}`);
      if (error instanceof CustomError) throw error;
      throw new CustomError("Failed to initiate payment. Please try again.", 500);
    }
  }

  async handleWebhook(payload: any, webhookHash: string): Promise<void> {
    // Verify webhook signature
    if (env.FLUTTERWAVE_WEBHOOK_HASH && webhookHash !== env.FLUTTERWAVE_WEBHOOK_HASH) {
      logger.error("Invalid Flutterwave webhook hash");
      throw new CustomError("Invalid webhook signature", 401);
    }

    const { event, data } = payload;

    if (event !== "charge.completed" || data.status !== "successful") {
      logger.info(`Ignoring webhook event: ${event}, status: ${data.status}`);
      return;
    }

    // Check for duplicate processing
    const existing = await this.subscriptionRepo.findByTransactionRef(data.tx_ref);
    if (existing) {
      logger.info(`Webhook already processed for tx_ref: ${data.tx_ref}`);
      return;
    }

    // Verify transaction with Flutterwave
    try {
      const verifyResponse = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${data.id}/verify`,
        {
          headers: {
            Authorization: `Bearer ${env.FLUTTERWAVE_SECRET_KEY}`,
          },
        },
      );

      if (
        verifyResponse.data.status !== "success" ||
        verifyResponse.data.data.status !== "successful"
      ) {
        logger.error(`Transaction verification failed for id: ${data.id}`);
        return;
      }
    } catch (error: any) {
      logger.error(`Flutterwave verification error: ${error.message}`);
      return;
    }

    // Extract userId from meta
    const userId = data.meta?.userId;
    if (!userId) {
      logger.error(`No userId in webhook meta for tx_ref: ${data.tx_ref}`);
      return;
    }

    const user = await this.userRepo.findById(userId);
    if (!user) {
      logger.error(`User not found for webhook userId: ${userId}`);
      return;
    }

    // Create subscription record
    const now = new Date();
    const endDate = new Date(now);
    endDate.setMonth(endDate.getMonth() + 1);

    const subscription = new Subscription(
      crypto.randomUUID(),
      userId,
      String(data.id),
      data.tx_ref,
      data?.meta?.plan,
      data.amount,
      data.currency,
      SubscriptionStatus.ACTIVE,
      now,
      endDate,
    );

    await this.subscriptionRepo.create(subscription);

    // Update user's subscription plan
    user.subscriptionPlan = data?.meta?.plan || 'basic';
    await this.userRepo.update(user);

    logger.info(`User ${userId} upgraded to ${data?.meta?.plan} via transaction ${data.tx_ref}`);
  }

  async getStatus(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new CustomError("User not found", 404);

    const subscription = await this.subscriptionRepo.findActiveByUserId(userId);

    return {
      plan: user.subscriptionPlan || SubscriptionPlan.FREE,
      subscription: subscription
        ? {
            id: subscription.id,
            plan: subscription.plan,
            status: subscription.status,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
          }
        : null,
    };
  }
}
