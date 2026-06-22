export enum DocumentType {
  CV = "cv",
  SOP = "sop",
  RESEARCH_PROPOSAL = "research_proposal",
  COLD_EMAIL = "cold_email",
  FEE_WAIVER = "fee_waiver",
  PERSONAL_STATEMENT = "personal_statement",
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
}
