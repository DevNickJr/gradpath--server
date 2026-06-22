export enum PublicationType {
  JOURNAL = "journal",
  CONFERENCE = "conference",
  PREPRINT = "preprint",
  THESIS = "thesis",
}

export class Publication {
  constructor(
    public readonly id: string,
    public userId: string,
    public title: string,
    public journal?: string,
    public date?: Date,
    public authors?: string[],
    public url?: string,
    public type?: PublicationType,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
