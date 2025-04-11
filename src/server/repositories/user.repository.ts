import type { User } from "../models/Users.model";

export interface UserRepository {
  findById(id: string): Promise<User>;
  save(user: User): Promise<void>;
}
