import { Request, Response, NextFunction } from "express";
import { SubscriptionService } from "../application/subscription.service";
import { UsageService } from "../application/usage.service";

export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly usageService: UsageService,
  ) {}

  initiateCheckout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.subscriptionService.initiateCheckout(req.user!.id, req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  handleWebhook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hash = req.headers["verif-hash"] as string || "";
      await this.subscriptionService.handleWebhook(req.body, hash);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = await this.subscriptionService.getStatus(req.user!.id);
      res.json({ success: true, data: status });
    } catch (error) {
      next(error);
    }
  };

  getUsage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plan = req.user!.subscriptionPlan || "free";
      const usage = await this.usageService.getUsageSummary(req.user!.id, plan);
      res.json({ success: true, data: usage });
    } catch (error) {
      next(error);
    }
  };
}
