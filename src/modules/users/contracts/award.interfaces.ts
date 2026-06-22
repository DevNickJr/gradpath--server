import { Award } from "../domain/award";

export interface AwardRepository {
  create(award: Award): Promise<Award>;
  findById(id: string): Promise<Award | null>;
  findByUserId(userId: string): Promise<Award[]>;
  update(award: Award): Promise<Award>;
  delete(id: string): Promise<void>;
}
