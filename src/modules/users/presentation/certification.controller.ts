import { Request, Response, NextFunction } from "express";
import { CertificationService } from "../application/certification.service";
import CustomError from "@/shared/utils/custom-error";

export class CertificationController {
  constructor(private readonly certService: CertificationService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const cert = await this.certService.create(userId, req.body);
      res.status(201).json({ success: true, data: cert });
    } catch (error) { next(error); }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const certs = await this.certService.findAll(userId);
      res.json({ success: true, data: certs });
    } catch (error) { next(error); }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const cert = await this.certService.findOne(req.params.id as string, userId);
      res.json({ success: true, data: cert });
    } catch (error) { next(error); }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const cert = await this.certService.update(req.params.id as string, userId, req.body);
      res.json({ success: true, data: cert });
    } catch (error) { next(error); }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      await this.certService.delete(req.params.id as string, userId);
      res.json({ success: true, message: "Certification deleted" });
    } catch (error) { next(error); }
  };
}
