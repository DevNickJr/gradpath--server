import { Request, Response, NextFunction } from "express";
import { ExperienceService } from "../application/experience.service";
import CustomError from "@/shared/utils/custom-error";

export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const experience = await this.experienceService.create(userId, req.body);
      res.status(201).json({ success: true, data: experience });
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const experiences = await this.experienceService.findAll(userId);
      res.json({ success: true, data: experiences });
    } catch (error) {
      next(error);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const experience = await this.experienceService.findOne(req.params.id as string, userId);
      res.json({ success: true, data: experience });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const experience = await this.experienceService.update(req.params.id as string, userId, req.body);
      res.json({ success: true, data: experience });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      await this.experienceService.delete(req.params.id as string, userId);
      res.json({ success: true, message: "Experience deleted" });
    } catch (error) {
      next(error);
    }
  };
}
