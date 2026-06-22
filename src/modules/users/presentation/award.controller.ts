import { Request, Response, NextFunction } from "express";
import { AwardService } from "../application/award.service";
import CustomError from "@/shared/utils/custom-error";

export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const award = await this.awardService.create(userId, req.body);
      res.status(201).json({ success: true, data: award });
    } catch (error) { next(error); }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const awards = await this.awardService.findAll(userId);
      res.json({ success: true, data: awards });
    } catch (error) { next(error); }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const award = await this.awardService.findOne(req.params.id as string, userId);
      res.json({ success: true, data: award });
    } catch (error) { next(error); }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const award = await this.awardService.update(req.params.id as string, userId, req.body);
      res.json({ success: true, data: award });
    } catch (error) { next(error); }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      await this.awardService.delete(req.params.id as string, userId);
      res.json({ success: true, message: "Award deleted" });
    } catch (error) { next(error); }
  };
}
