import { Auth } from "../../../Auth/Domain/Entities/Auth"
import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { UserRepository } from "../../Domain/Repositories/UserRepository"
import { User } from "../../Domain/Entities/User"
import { Email } from "../../Domain/VOs/Email"
import { AuthRepository } from "../../../Auth/Domain/Repositories/AuthRepository"

export class CreateUser {

    constructor(
        private userRepository: UserRepository,
        private authRepository: AuthRepository,
        private eventBus: EventBus,
    ) {}

    public async run({email, password}: {email: string, password: string}): Promise<void> {
        const existingUser = await this.userRepository.find(new Email(email))

        if (existingUser) {
            return
        }

        const user = User.create({ email })
        const auth = Auth.create({ userId: user.id, password })

        await Promise.all([
            this.userRepository.save(user),
            this.authRepository.save(auth)
        ])

        this.eventBus.publish(user.pullDomainEvents());
        this.eventBus.publish(auth.pullDomainEvents());
    }
}