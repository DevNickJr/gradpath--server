export enum DegreeType {
  BSC = "BSc",
  MSC = "MSc",
  PHD = "PhD",
  POSTDOC = "PostDoc",
  OTHER = "Other",
}

export class Education {
  constructor(
    public readonly id: string,
    public userId: string,
    public institution: string,
    public degree: DegreeType,
    public fieldOfStudy: string,
    public gpa?: number,
    public gpaScale?: number,
    public startDate?: Date,
    public endDate?: Date,
    public country?: string,
    public thesis?: string,
    public description?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
