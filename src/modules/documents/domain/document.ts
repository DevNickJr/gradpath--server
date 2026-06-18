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
   constructor(props: {
    id: string,
    userId: string,
    type: DocumentType,
    title: string,
    content: string,
    status: DocumentStatus,
    metadata: Record<string, any>,
    opportunityId?: string | null,
    createdAt?: Date,
    updatedAt?: Date,
    prompt?: string,
  }) {
    Object.assign(this, {
      ...props,
      status: props.status || DocumentStatus.PENDING,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.createdAt || new Date(),
      metadata: props.metadata || {},
      prompt: props.prompt || '',
      opportunityId: props.opportunityId || null,
    });
  }

  id!: string;
  userId!: string;
  type!: DocumentType;
  title!: string;
  content!: string;
  status!: DocumentStatus;
  metadata!: Record<string, any>;
  prompt!: string;
  opportunityId?: string | null;
  createdAt!: Date;
  updatedAt!: Date;

  // constructor(
  //   public readonly id: string,
  //   public userId: string,
  //   public type: DocumentType,
  //   public title: string,
  //   public content: string,
  //   public status: DocumentStatus = DocumentStatus.PENDING,
  //   public metadata: Record<string, any> = {},
  //   public opportunityId?: string,
  //   public createdAt: Date = new Date(),
  //   public updatedAt: Date = new Date(),
  //   public prompt?: string,
  // ) {}
}
