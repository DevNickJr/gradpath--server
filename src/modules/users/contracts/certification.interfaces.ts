import { Certification } from "../domain/certification";

export interface CertificationRepository {
  create(cert: Certification): Promise<Certification>;
  findById(id: string): Promise<Certification | null>;
  findByUserId(userId: string): Promise<Certification[]>;
  update(cert: Certification): Promise<Certification>;
  delete(id: string): Promise<void>;
}
