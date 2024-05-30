import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { UserRepository } from "../../Domain/Repositories/UserRepository"
import { UserFinder } from "../../Domain/Services/UserFinder"
import { PermissionType } from "../../Domain/VOs/Permission"

export class ChangePermissions {

    constructor(
        private userFinder: UserFinder,
        private userRepository: UserRepository,
        private eventBus: EventBus,
    ) {}

    public async run({ userId, permissions }: { userId: string, permissions: PermissionType[] }): Promise<void> {
        const user = await this.userFinder.run(userId)

        user.changePermissions(permissions)

        await this.userRepository.save(user),
        this.eventBus.publish(user.pullDomainEvents());
    }
}