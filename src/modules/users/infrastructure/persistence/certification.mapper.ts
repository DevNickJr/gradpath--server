import { Certification } from "../../domain/certification";
import { CertificationOrmEntity } from "./certification.orm-entity";

export class CertificationMapper {
  static toDomain(entity: CertificationOrmEntity): Certification {
    return new Certification(
      entity.id, entity.userId, entity.name, entity.issuingOrg,
      entity.dateIssued ? new Date(entity.dateIssued) : undefined,
      entity.expiryDate ? new Date(entity.expiryDate) : undefined,
      entity.credentialUrl, entity.createdAt, entity.updatedAt,
    );
  }

  static toPersistence(cert: Certification): CertificationOrmEntity {
    const entity = new CertificationOrmEntity();
    entity.id = cert.id; entity.userId = cert.userId; entity.name = cert.name;
    entity.issuingOrg = cert.issuingOrg; entity.dateIssued = cert.dateIssued;
    entity.expiryDate = cert.expiryDate; entity.credentialUrl = cert.credentialUrl;
    entity.createdAt = cert.createdAt; entity.updatedAt = cert.updatedAt;
    return entity;
  }
}
