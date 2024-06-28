import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { UserRepository } from "../../Domain/Repositories/UserRepository"
import { UserFinder } from "../../Domain/Services/UserFinder"
import { PermissionType } from "../../../Shared/Domain/VOs/Permission"

export class ChangeUserPermissions {

    constructor(
        private userFinder: UserFinder,
        private userRepository: UserRepository,
        private eventBus: EventBus,
    ) {}

    public async run({ userId, newPermissions }: { userId: string, newPermissions: PermissionType[] }): Promise<void> {
        const user = await this.userFinder.run(userId)

        user.changePermissions(newPermissions)

        await this.userRepository.save(user),
        await this.eventBus.publish(user.pullDomainEvents());
    }
}