import { Id } from "../../../Shared/Domain/VOs/Id";
import { User } from "../Entities/User";
import { Email } from "../VOs/Email";

export interface UserRepository {
    save(user: User): Promise<void>;
    findById(id: Id): Promise<User | null>;
    findByEmail(email: Email): Promise<User | null>;
    getAll(): Promise<User[]>;
    delete(user: User): Promise<void>;
}