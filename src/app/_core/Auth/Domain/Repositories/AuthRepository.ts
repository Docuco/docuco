import { Id } from "../../../Shared/Domain/VOs/Id";
import { Auth } from "../Entities/Auth";

export interface AuthRepository {
    save(auth: Auth): Promise<void>;
    findByAccountId(accountId: Id): Promise<Auth | null>;
}