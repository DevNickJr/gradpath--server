import { Request, Response, NextFunction } from "express";
import { PublicationService } from "../application/publication.service";
import CustomError from "@/shared/utils/custom-error";

export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const pub = await this.publicationService.create(userId, req.body);
      res.status(201).json({ success: true, data: pub });
    } catch (error) { next(error); }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const pubs = await this.publicationService.findAll(userId);
      res.json({ success: true, data: pubs });
    } catch (error) { next(error); }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const pub = await this.publicationService.findOne(req.params.id as string, userId);
      res.json({ success: true, data: pub });
    } catch (error) { next(error); }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      const pub = await this.publicationService.update(req.params.id as string, userId, req.body);
      res.json({ success: true, data: pub });
    } catch (error) { next(error); }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new CustomError("Unauthorized", 401);
      await this.publicationService.delete(req.params.id as string, userId);
      res.json({ success: true, message: "Publication deleted" });
    } catch (error) { next(error); }
  };
}
