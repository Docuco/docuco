import { User } from "../Entities/User";
import { Email } from "../VOs/Email";

export interface UserRepository {
    save(user: User): Promise<void>;
    find(email: Email): Promise<User | null>;
}