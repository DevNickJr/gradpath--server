import crypto from "crypto";
import { SavedOpportunity } from "@/modules/saved-opportunities/domain/saved-opportunity";
import { SavedOpportunityRepository } from "@/modules/saved-opportunities/contracts/saved-opportunity.interfaces";

export class SavedOpportunityService {
  constructor(private readonly savedRepo: SavedOpportunityRepository) {}

  async toggleSave(userId: string, opportunityId: string) {
    const existing = await this.savedRepo.findByUserAndOpportunity(userId, opportunityId);

    if (existing) {
      await this.savedRepo.delete(userId, opportunityId);
      return { saved: false, message: "Opportunity removed from saved" };
    }

    const saved = new SavedOpportunity(crypto.randomUUID(), userId, opportunityId);
    await this.savedRepo.save(saved);
    return { saved: true, message: "Opportunity saved" };
  }

  async getSavedOpportunities(userId: string, page = 1, limit = 20) {
    return this.savedRepo.findByUserId(userId, page, limit);
  }

  async checkIfSaved(userId: string, opportunityId: string) {
    const existing = await this.savedRepo.findByUserAndOpportunity(userId, opportunityId);
    return { saved: !!existing };
  }
}
