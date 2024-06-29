import { AuthRepository } from "../../../Auth/Domain/Repositories/AuthRepository"
import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { Id } from "../../../Shared/Domain/VOs/Id"
import { UserRepository } from "../../Domain/Repositories/UserRepository"
import { UserFinder } from "../../Domain/Services/UserFinder"

export class DeleteUser {

    constructor(
        private userFinder: UserFinder,
        private userRepository: UserRepository,
        private authRepository: AuthRepository,
        private eventBus: EventBus,
    ) {}

    public async run({ id }: { id: string }): Promise<void> {
        const user = await this.userFinder.run(id)
        const auths = await this.authRepository.findByUserId(new Id(id))

        user.delete()
        auths.forEach((auth) => auth.delete())

        await Promise.all([
            this.userRepository.delete(user),
            ...auths.map((auth) => this.authRepository.delete(auth))
        ])

        this.eventBus.publish(user.pullDomainEvents());
    }
}