import { Referee } from "../domain/referee";

export interface RefereeRepository {
  create(referee: Referee): Promise<Referee>;
  findById(id: string): Promise<Referee | null>;
  findByUserId(userId: string): Promise<Referee[]>;
  update(referee: Referee): Promise<Referee>;
  delete(id: string): Promise<void>;
}
