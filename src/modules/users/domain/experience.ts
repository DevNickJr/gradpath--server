export enum ExperienceType {
  WORK = "work",
  RESEARCH = "research",
  TEACHING = "teaching",
  VOLUNTEER = "volunteer",
}

export class Experience {
  constructor(
    public readonly id: string,
    public userId: string,
    public title: string,
    public organization: string,
    public type: ExperienceType,
    public startDate?: Date,
    public endDate?: Date,
    public isCurrent: boolean = false,
    public description?: string,
    public location?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
