import { Education } from "../domain/education";

export interface EducationRepository {
  create(education: Education): Promise<Education>;
  findById(id: string): Promise<Education | null>;
  findByUserId(userId: string): Promise<Education[]>;
  update(education: Education): Promise<Education>;
  delete(id: string): Promise<void>;
}
