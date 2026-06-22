export class Comment {
  constructor(
    public readonly id: string,
    public userId: string,
    public opportunityId: string,
    public content: string,
    public parentId?: string | null,
    public author?: { firstName: string; lastName: string; profileImage?: string },
    public replies?: Comment[],
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
