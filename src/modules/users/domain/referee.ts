export class Referee {
  constructor(
    public readonly id: string,
    public userId: string,
    public name: string,
    public title?: string,
    public institution?: string,
    public email?: string,
    public phone?: string,
    public relationship?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
