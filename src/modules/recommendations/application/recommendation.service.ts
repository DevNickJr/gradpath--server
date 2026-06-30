import { OpportunityRepository } from "@/modules/opportunities/contracts/opportunity.interfaces";
import { Opportunity, FundingType } from "@/modules/opportunities/domain/opportunity";
import { UserRepository } from "@/modules/users/contracts/user.interfaces";
import { UserProfile } from "@/modules/users/domain/user";
import { UsageService } from "@/modules/subscriptions/application/usage.service";
import { UsageAction } from "@/modules/subscriptions/domain/usage-record";
import CustomError from "@/shared/utils/custom-error";

export class RecommendationService {
  constructor(
    private readonly opportunityRepo: OpportunityRepository,
    private readonly userRepo: UserRepository,
    private readonly usageService: UsageService,
  ) {}

  async getRecommendations(userId: string, userPlan: string): Promise<Opportunity[]> {
    // Check and increment usage
    await this.usageService.checkAndIncrement(userId, UsageAction.RECOMMENDATION, userPlan);

    const user = await this.userRepo.findById(userId);
    if (!user) throw new CustomError("User not found", 404);

    if (!user.profile) {
      throw new CustomError(
        "Please complete your profile to get personalized recommendations.",
        400,
      );
    }

    // Fetch active opportunities
    const result = await this.opportunityRepo.search({
      isActive: true,
      page: 1,
      limit: 200,
      sortBy: "createdAt",
      sortOrder: "DESC",
    });

    if (result.data.length === 0) {
      return [];
    }

    // Score and rank
    const scored = result.data.map((opp) => ({
      opportunity: opp,
      score: this.calculateScore(opp, user.profile!),
    }));

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, 10).map((s) => s.opportunity);
  }

  private calculateScore(opp: Opportunity, profile: UserProfile): number {
    let score = 0;

    // +3: Country match
    if (
      profile.targetCountries &&
      profile.targetCountries.some(
        (c) => c.toLowerCase() === opp.country.toLowerCase(),
      )
    ) {
      score += 3;
    }

    // +2: Field of study / research interest overlap
    if (profile.researchInterests && opp.fieldsOfStudy) {
      const hasOverlap = profile.researchInterests.some((ri) =>
        opp.fieldsOfStudy.some(
          (f) =>
            f.toLowerCase().includes(ri.toLowerCase()) ||
            ri.toLowerCase().includes(f.toLowerCase()),
        ),
      );
      if (hasOverlap) score += 2;
    }

    // +1: Fully funded
    if (opp.fundingType === FundingType.FULLY_FUNDED) {
      score += 1;
    }

    // +1: Deadline in 30-180 days
    const now = new Date();
    const deadline = new Date(opp.deadline);
    const daysUntilDeadline = Math.ceil(
      (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (daysUntilDeadline >= 30 && daysUntilDeadline <= 180) {
      score += 1;
    }

    return score;
  }
}
