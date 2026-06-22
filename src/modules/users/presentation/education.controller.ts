import { Request, Response, NextFunction } from "express";
import { EducationService } from "../application/education.service";
import CustomError from "@/shared/utils/custom-error";

export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const education = await this.educationService.create(userId, req.body);
      res.status(201).json({ success: true, data: education });
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const educations = await this.educationService.findAll(userId);
      res.json({ success: true, data: educations });
    } catch (error) {
      next(error);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const education = await this.educationService.findOne(req.params.id as string, userId);
      res.json({ success: true, data: education });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const education = await this.educationService.update(req.params.id as string, userId, req.body);
      res.json({ success: true, data: education });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      await this.educationService.delete(req.params.id as string, userId);
      res.json({ success: true, message: "Education deleted" });
    } catch (error) {
      next(error);
    }
  };
}
