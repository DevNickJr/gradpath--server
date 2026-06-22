import { Request, Response, NextFunction } from "express";
import { TestScoreService } from "../application/test-score.service";
import CustomError from "@/shared/utils/custom-error";

export class TestScoreController {
  constructor(private readonly testScoreService: TestScoreService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const ts = await this.testScoreService.create(userId, req.body);
      res.status(201).json({ success: true, data: ts });
    } catch (error) { next(error); }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const scores = await this.testScoreService.findAll(userId);
      res.json({ success: true, data: scores });
    } catch (error) { next(error); }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const ts = await this.testScoreService.findOne(req.params.id as string, userId);
      res.json({ success: true, data: ts });
    } catch (error) { next(error); }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const ts = await this.testScoreService.update(req.params.id as string, userId, req.body);
      res.json({ success: true, data: ts });
    } catch (error) { next(error); }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      await this.testScoreService.delete(req.params.id as string, userId);
      res.json({ success: true, message: "Test score deleted" });
    } catch (error) { next(error); }
  };
}
