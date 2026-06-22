import { Experience } from "../domain/experience";

export interface ExperienceRepository {
  create(experience: Experience): Promise<Experience>;
  findById(id: string): Promise<Experience | null>;
  findByUserId(userId: string): Promise<Experience[]>;
  update(experience: Experience): Promise<Experience>;
  delete(id: string): Promise<void>;
}
