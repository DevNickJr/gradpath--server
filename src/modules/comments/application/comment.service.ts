import { Comment } from "../domain/comment";
import { CommentRepository } from "../contracts/comment.interfaces";
import { OpportunityRepository } from "@/modules/opportunities/contracts/opportunity.interfaces";
import { CreateCommentDTO } from "../contracts/comment.schemas";
import { RolesEnum } from "@/modules/users/contracts/user.interfaces";
import CustomError from "@/shared/utils/custom-error";

export class CommentService {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly opportunityRepo: OpportunityRepository,
  ) {}

  async create(userId: string, opportunityId: string, dto: CreateCommentDTO): Promise<Comment> {
    const opportunity = await this.opportunityRepo.findById(opportunityId);
    if (!opportunity) throw new CustomError("Opportunity not found", 404);

    if (dto.parentId) {
      const parent = await this.commentRepo.findById(dto.parentId);
      if (!parent) throw new CustomError("Parent comment not found", 404);
      if (parent.opportunityId !== opportunityId) {
        throw new CustomError("Parent comment does not belong to this opportunity", 400);
      }
    }

    const comment = new Comment(
      crypto.randomUUID(),
      userId,
      opportunityId,
      dto.content,
      dto.parentId || null,
    );

    return this.commentRepo.create(comment);
  }

  async getByOpportunity(opportunityId: string, page = 1, limit = 20) {
    return this.commentRepo.findByOpportunityId(opportunityId, page, limit);
  }

  async delete(id: string, userId: string, userRole: RolesEnum): Promise<void> {
    const comment = await this.commentRepo.findById(id);
    if (!comment) throw new CustomError("Comment not found", 404);

    const isOwner = comment.userId === userId;
    const isAdmin = userRole === RolesEnum.ADMIN || userRole === RolesEnum.AGENT;

    if (!isOwner && !isAdmin) {
      throw new CustomError("Forbidden", 403);
    }

    await this.commentRepo.delete(id);
  }
}
