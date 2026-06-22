export class Award {
  constructor(
    public readonly id: string,
    public userId: string,
    public title: string,
    public issuingOrg?: string,
    public date?: Date,
    public description?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
