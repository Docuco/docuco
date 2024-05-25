import { Auth } from "../../../Auth/Domain/Entities/Auth"
import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { AccountRepository } from "../../Domain/Repositories/AccountRepository"
import { Account } from "../../Domain/Entities/Account"
import { Email } from "../../Domain/VOs/Email"
import { AuthRepository } from "../../../Auth/Domain/Repositories/AuthRepository"

export class CreateAccount {

    constructor(
        private accountRepository: AccountRepository,
        private authRepository: AuthRepository,
        private eventBus: EventBus,
    ) {}

    public async run({email, password}: {email: string, password: string}): Promise<void> {
        const existingAccount = await this.accountRepository.find(new Email(email))

        if (existingAccount) {
            return
        }

        const account = Account.create({ email })
        const auth = Auth.create({ accountId: account.id, password })

        await Promise.all([
            this.accountRepository.save(account),
            this.authRepository.save(auth)
        ])

        this.eventBus.publish(account.pullDomainEvents());
        this.eventBus.publish(auth.pullDomainEvents());
    }
}