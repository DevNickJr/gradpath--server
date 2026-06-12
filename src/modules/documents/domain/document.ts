export enum DocumentType {
  CV = "cv",
  SOP = "sop",
  RESEARCH_PROPOSAL = "research_proposal",
}

export enum DocumentStatus {
  PENDING = "pending",
  GENERATING = "generating",
  COMPLETED = "completed",
  FAILED = "failed",
}

export class Document {
  constructor(
    public readonly id: string,
    public userId: string,
    public type: DocumentType,
    public title: string,
    public prompt: string,
    public content: string,
    public status: DocumentStatus = DocumentStatus.PENDING,
    public metadata: Record<string, any> = {},
    public opportunityId?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
