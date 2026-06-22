export enum InquiryStatus {
  OPEN = "open",
  RESOLVED = "resolved",
}

export class Inquiry {
  constructor(
    public readonly id: string,
    public userId: string,
    public subject: string,
    public message: string,
    public status: InquiryStatus = InquiryStatus.OPEN,
    public parentId?: string | null,
    public author?: { firstName: string; lastName: string; profileImage?: string },
    public replies?: Inquiry[],
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
