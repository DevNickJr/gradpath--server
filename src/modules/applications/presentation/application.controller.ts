import { Request, Response, NextFunction } from "express";
import { ApplicationService } from "../application/application.service";

export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const app = await this.applicationService.create(req.user!.id, req.body);
      res.status(201).json({ success: true, data: app });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const status = req.query.status as string | undefined;
      const result = await this.applicationService.getApplications(req.user!.id, status, page, limit);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const app = await this.applicationService.getApplication(req.params.id as string, req.user!.id);
      res.json({ success: true, data: app });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const app = await this.applicationService.update(req.params.id as string, req.user!.id, req.body);
      res.json({ success: true, data: app });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.applicationService.delete(req.params.id as string, req.user!.id);
      res.json({ success: true, message: "Application tracker removed" });
    } catch (error) {
      next(error);
    }
  };
}
