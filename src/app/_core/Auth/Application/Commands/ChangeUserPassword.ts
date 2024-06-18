import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { AuthNotFound } from "../../Domain/Exceptions/AuthNotFound";
import { AuthRepository } from "../../Domain/Repositories/AuthRepository";

export class ChangeUserPassword {

    constructor(
        private authRepository: AuthRepository,
        private eventBus: EventBus,
    ) {}

    public async run({ userId, newPassword }: { userId: string, newPassword: string }): Promise<void> {
        const auths = await this.authRepository.findByUserId(new Id(userId));

        const passwordAuth = auths.find(auth => auth.isPasswordAuth());
        if (auths.length === 0 || !passwordAuth) {
            throw new AuthNotFound(userId);
        }

        passwordAuth.changePassword(newPassword)
        
        await this.authRepository.save(passwordAuth);

        this.eventBus.publish(passwordAuth.pullDomainEvents())
    }
}