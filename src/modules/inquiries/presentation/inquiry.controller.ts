import { Request, Response, NextFunction } from "express";
import { InquiryService } from "../application/inquiry.service";
import CustomError from "@/shared/utils/custom-error";

export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const inquiry = await this.inquiryService.create(userId, req.body);
      res.status(201).json({ success: true, data: inquiry });
    } catch (error) {
      next(error);
    }
  };

  getMyInquiries = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const result = await this.inquiryService.getMyInquiries(userId, page, limit);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getAllInquiries = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const result = await this.inquiryService.getAllInquiries(page, limit);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const inquiry = await this.inquiryService.getOne(req.params.id as string, userId, req.user!.role);
      res.json({ success: true, data: inquiry });
    } catch (error) {
      next(error);
    }
  };

  reply = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const reply = await this.inquiryService.reply(req.params.id as string, userId, req.body);
      res.status(201).json({ success: true, data: reply });
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inquiry = await this.inquiryService.updateStatus(req.params.id as string, req.body);
      res.json({ success: true, data: inquiry });
    } catch (error) {
      next(error);
    }
  };
}
