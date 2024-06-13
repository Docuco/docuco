import { Id } from "../../../Shared/Domain/VOs/Id";
import { Auth } from "../Entities/Auth";

export interface AuthRepository {
    save(auth: Auth): Promise<void>;
    findByUserId(userId: Id): Promise<Auth[]>;
}