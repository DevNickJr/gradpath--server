import { Inquiry, InquiryStatus } from "../domain/inquiry";
import { InquiryRepository } from "../contracts/inquiry.interfaces";
import { CreateInquiryDTO, ReplyInquiryDTO, UpdateInquiryStatusDTO } from "../contracts/inquiry.schemas";
import { RolesEnum } from "@/modules/users/contracts/user.interfaces";
import CustomError from "@/shared/utils/custom-error";

export class InquiryService {
  constructor(private readonly inquiryRepo: InquiryRepository) {}

  async create(userId: string, dto: CreateInquiryDTO): Promise<Inquiry> {
    const inquiry = new Inquiry(
      crypto.randomUUID(),
      userId,
      dto.subject,
      dto.message,
    );
    return this.inquiryRepo.create(inquiry);
  }

  async reply(inquiryId: string, userId: string, dto: ReplyInquiryDTO): Promise<Inquiry> {
    const parent = await this.inquiryRepo.findById(inquiryId);
    if (!parent) throw new CustomError("Inquiry not found", 404);

    const reply = new Inquiry(
      crypto.randomUUID(),
      userId,
      parent.subject,
      dto.message,
      InquiryStatus.OPEN,
      inquiryId,
    );
    return this.inquiryRepo.create(reply);
  }

  async getMyInquiries(userId: string, page = 1, limit = 20) {
    return this.inquiryRepo.findByUserId(userId, page, limit);
  }

  async getAllInquiries(page = 1, limit = 20) {
    return this.inquiryRepo.findAll(page, limit);
  }

  async getOne(id: string, userId: string, userRole: RolesEnum): Promise<Inquiry> {
    const inquiry = await this.inquiryRepo.findById(id);
    if (!inquiry) throw new CustomError("Inquiry not found", 404);

    const isOwner = inquiry.userId === userId;
    const isAdmin = userRole === RolesEnum.ADMIN || userRole === RolesEnum.AGENT;

    if (!isOwner && !isAdmin) {
      throw new CustomError("Forbidden", 403);
    }

    return inquiry;
  }

  async updateStatus(id: string, dto: UpdateInquiryStatusDTO): Promise<Inquiry> {
    const inquiry = await this.inquiryRepo.findById(id);
    if (!inquiry) throw new CustomError("Inquiry not found", 404);
    (inquiry as any).status = dto.status as InquiryStatus;
    return this.inquiryRepo.update(inquiry);
  }
}
