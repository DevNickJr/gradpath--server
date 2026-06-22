import { Request, Response, NextFunction } from "express";
import { RefereeService } from "../application/referee.service";
import CustomError from "@/shared/utils/custom-error";

export class RefereeController {
  constructor(private readonly refereeService: RefereeService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const referee = await this.refereeService.create(userId, req.body);
      res.status(201).json({ success: true, data: referee });
    } catch (error) { next(error); }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const referees = await this.refereeService.findAll(userId);
      res.json({ success: true, data: referees });
    } catch (error) { next(error); }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const referee = await this.refereeService.findOne(req.params.id as string, userId);
      res.json({ success: true, data: referee });
    } catch (error) { next(error); }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const referee = await this.refereeService.update(req.params.id as string, userId, req.body);
      res.json({ success: true, data: referee });
    } catch (error) { next(error); }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      await this.refereeService.delete(req.params.id as string, userId);
      res.json({ success: true, message: "Referee deleted" });
    } catch (error) { next(error); }
  };
}
