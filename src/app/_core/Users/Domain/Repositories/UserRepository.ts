import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { User } from "../Entities/User";
import { Email } from "../VOs/Email";

export interface UserRepository {
    save(user: User): Promise<void>;
    findById(id: Id): Promise<Option<User>>;
    findByEmail(email: Email): Promise<Option<User>>;
    getAll(): Promise<User[]>;
    delete(user: User): Promise<void>;
}