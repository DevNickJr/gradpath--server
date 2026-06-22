import { Publication } from "../domain/publication";

export interface PublicationRepository {
  create(publication: Publication): Promise<Publication>;
  findById(id: string): Promise<Publication | null>;
  findByUserId(userId: string): Promise<Publication[]>;
  update(publication: Publication): Promise<Publication>;
  delete(id: string): Promise<void>;
}
