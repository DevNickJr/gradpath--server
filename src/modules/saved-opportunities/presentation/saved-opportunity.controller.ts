import { Request, Response, NextFunction } from "express";
import { SavedOpportunityService } from "../application/saved-opportunity.service";

export class SavedOpportunityController {
  constructor(private readonly savedService: SavedOpportunityService) {}

  toggleSave = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.savedService.toggleSave(req.user!.id, req.body.opportunityId);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  getMyList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await this.savedService.getSavedOpportunities(req.user!.id, page, limit);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  checkStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.savedService.checkIfSaved(req.user!.id, req.params.opportunityId as string);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };
}
