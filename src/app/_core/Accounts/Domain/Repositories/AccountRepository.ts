import { Account } from "../Entities/Account";
import { Email } from "../VOs/Email";

export interface AccountRepository {
    save(account: Account): Promise<void>;
    find(email: Email): Promise<Account | null>;
}