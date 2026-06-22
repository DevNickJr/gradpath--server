export class Certification {
  constructor(
    public readonly id: string,
    public userId: string,
    public name: string,
    public issuingOrg?: string,
    public dateIssued?: Date,
    public expiryDate?: Date,
    public credentialUrl?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
