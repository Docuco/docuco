import { Account } from "../../Domain/Entities/Account"
import { AccountFinder } from "../../Domain/Services/AccountFinder"

export class GetAccount {

    constructor(
        private accountFinder: AccountFinder,
    ) {}

    public async run({email}: {email: string}): Promise<Account> {
        return this.accountFinder.run(email)
    }
}