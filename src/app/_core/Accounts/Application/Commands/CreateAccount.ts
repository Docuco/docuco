import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { AccountRepository } from "../../Domain/Contracts/AccountRepository"
import { Account } from "../../Domain/Entities/Account"
import { Email } from "../../Domain/VOs/Email"

export class CreateAccount {

    constructor(
        private accountRepository: AccountRepository,
        private eventBus: EventBus,
    ) {}

    public async run({email, password}: {email: string, password: string}): Promise<void> {
        const existingAccount = await this.accountRepository.find(new Email(email))

        if (existingAccount) {
            return
        }

        const account = Account.create({email, password})
        await this.accountRepository.save(account)

        this.eventBus.publish(account.pullDomainEvents());
    }
}