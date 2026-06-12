import { Request, Response, NextFunction } from "express";
import { DocumentService } from "../application/document.service";

export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  generate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await this.documentService.generateDocument(req.user!.id, req.body);
      res.status(201).json({ success: true, data: doc });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await this.documentService.getDocuments(req.user!.id, page, limit);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await this.documentService.getDocument(req.params.id as string, req.user!.id);
      res.json({ success: true, data: doc });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.documentService.deleteDocument(req.params.id as string, req.user!.id);
      res.json({ success: true, message: "Document deleted" });
    } catch (error) {
      next(error);
    }
  };
}
