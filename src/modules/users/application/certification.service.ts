import { Certification } from "../domain/certification";
import { CertificationRepository } from "../contracts/certification.interfaces";
import { CreateCertificationDTO, UpdateCertificationDTO } from "../contracts/certification.schemas";
import CustomError from "@/shared/utils/custom-error";

export class CertificationService {
  constructor(private readonly certRepo: CertificationRepository) {}

  async create(userId: string, dto: CreateCertificationDTO): Promise<Certification> {
    const cert = new Certification(
      crypto.randomUUID(), userId, dto.name, dto.issuingOrg,
      dto.dateIssued ? new Date(dto.dateIssued) : undefined,
      dto.expiryDate ? new Date(dto.expiryDate) : undefined,
      dto.credentialUrl,
    );
    return this.certRepo.create(cert);
  }

  async findAll(userId: string): Promise<Certification[]> {
    return this.certRepo.findByUserId(userId);
  }

  async findOne(id: string, userId: string): Promise<Certification> {
    const cert = await this.certRepo.findById(id);
    if (!cert) throw new CustomError("Certification not found", 404);
    if (cert.userId !== userId) throw new CustomError("Forbidden", 403);
    return cert;
  }

  async update(id: string, userId: string, dto: UpdateCertificationDTO): Promise<Certification> {
    const cert = await this.findOne(id, userId);
    if (dto.name !== undefined) cert.name = dto.name;
    if (dto.issuingOrg !== undefined) cert.issuingOrg = dto.issuingOrg;
    if (dto.dateIssued !== undefined) cert.dateIssued = new Date(dto.dateIssued);
    if (dto.expiryDate !== undefined) cert.expiryDate = new Date(dto.expiryDate);
    if (dto.credentialUrl !== undefined) cert.credentialUrl = dto.credentialUrl;
    return this.certRepo.update(cert);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.certRepo.delete(id);
  }
}
