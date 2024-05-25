import { AccountRepository } from "../Repositories/AccountRepository";
import { Account } from "../Entities/Account";
import { AccountNotFound } from "../Exceptions/AccountNotFound";
import { Email } from "../VOs/Email";

export class AccountFinder {

    constructor(
        private accountRepository: AccountRepository,
    ) {}

    public async run(emailPrimitive: string): Promise<Account> {
        const email = new Email(emailPrimitive)
        const account = await this.accountRepository.find(email)

        if (!account) {
            throw new AccountNotFound(email);
        }

        return account
    }
}