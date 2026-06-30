import { Request, Response, NextFunction } from "express";
import { OpportunityService } from "../application/opportunity.service";
import { SearchOpportunityQuery } from "../contracts/opportunity.schemas";

export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const opp = await this.opportunityService.create(req.user!.id, req.body);
      res.status(201).json({ success: true, data: opp });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const opp = await this.opportunityService.getById(req.params.id as string);
      res.json({ success: true, data: opp });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const opp = await this.opportunityService.update(req.params.id as string, req.body);
      res.json({ success: true, data: opp });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.opportunityService.delete({
        opportunityId: req.params.id as string,
        ownerId: req.user!.id
      });
      res.json({ success: true, message: "Opportunity deleted" });
    } catch (error) {
      next(error);
    }
  };

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as SearchOpportunityQuery;
      const result = await this.opportunityService.search(query);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  stats = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await this.opportunityService.getStats();
      res.json({ success: true, data: stats });
    } catch (error) {
      next(error);
    }
  };
}
