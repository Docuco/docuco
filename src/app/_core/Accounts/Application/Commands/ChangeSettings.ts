import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { AccountRepository } from "../../Domain/Contracts/AccountRepository"
import { Account } from "../../Domain/Entities/Account"
import { OptionalSettingsPrimitive } from "../../Domain/Primitives/SettingsPrimitive"
import { AccountFinder } from "../../Domain/Services/AccountFinder"
import { Email } from "../../Domain/VOs/Email"

export class ChangeSettings {

    constructor(
        private accountRepository: AccountRepository,
        private accountFinder: AccountFinder,
        private eventBus: EventBus,
    ) {}

    public async run({ email, settings }: { email: string, settings: OptionalSettingsPrimitive }): Promise<void> {
        const account = await this.accountFinder.run(email)

        account.changeSettings(settings)
        await this.accountRepository.save(account)

        this.eventBus.publish(account.pullDomainEvents());
    }
}