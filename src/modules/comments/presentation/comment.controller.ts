import { Request, Response, NextFunction } from "express";
import { CommentService } from "../application/comment.service";
import CustomError from "@/shared/utils/custom-error";

export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const opportunityId = req.params.opportunityId as string;
      const comment = await this.commentService.create(userId, opportunityId, req.body);
      res.status(201).json({ success: true, data: comment });
    } catch (error) {
      next(error);
    }
  };

  getByOpportunity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const opportunityId = req.params.opportunityId as string;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const result = await this.commentService.getByOpportunity(opportunityId, page, limit);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      await this.commentService.delete(req.params.id as string, userId, req.user!.role);
      res.json({ success: true, message: "Comment deleted" });
    } catch (error) {
      next(error);
    }
  };
}
