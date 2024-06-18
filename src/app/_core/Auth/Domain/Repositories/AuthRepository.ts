import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { Auth } from "../Entities/Auth";

export interface AuthRepository {
    save(auth: Auth): Promise<void>;
    findByUserId(userId: Id): Promise<Auth[]>;
    findById(id: Id): Promise<Option<Auth>>;
    delete(auth: Auth): Promise<void>;
}