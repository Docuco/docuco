import { MikroORM } from "@mikro-orm/core";
import { AccountRepository } from "../../Domain/Contracts/AccountRepository";
import { Account } from "../../Domain/Entities/Account";
import { AccountPrimitive } from "../../Domain/Primitives/AccountPrimitive";
import { Email } from "../../Domain/VOs/Email";

export class SQLiteAccountRepository implements AccountRepository {

    constructor(private orm: MikroORM) {
    }

    private get repository() {
        const fork = this.orm.em.fork().getRepository<AccountPrimitive>('Account');

        return fork;
    }

    async save(account: Account): Promise<void> {
        this.repository.upsert(account.toPrimitives());
    }

    async find(email: Email): Promise<Account | null> {
        const result = await this.repository.findOne({ email: email.value });
        if (!result) {
            return null;
        }

        return Account.fromPrimitives(result);
    }
}