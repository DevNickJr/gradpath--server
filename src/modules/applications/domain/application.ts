export enum ApplicationStatus {
  INTERESTED = "interested",
  APPLYING = "applying",
  SUBMITTED = "submitted",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  WITHDRAWN = "withdrawn",
}

export class Application {
  constructor(
    public readonly id: string,
    public userId: string,
    public opportunityId: string,
    public status: ApplicationStatus = ApplicationStatus.INTERESTED,
    public notes: string = "",
    public submittedAt?: Date,
    public deadlineAt?: Date,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
