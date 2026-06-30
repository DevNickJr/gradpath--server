import { Request, Response, NextFunction } from "express";
import { RecommendationService } from "../application/recommendation.service";

export class RecommendationController {
  constructor(
    private readonly recommendationService: RecommendationService,
  ) {}

  getRecommendations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plan = req.user!.subscriptionPlan || "free";
      const recommendations = await this.recommendationService.getRecommendations(
        req.user!.id,
        plan,
      );
      res.json({ success: true, data: recommendations });
    } catch (error) {
      next(error);
    }
  };
}
