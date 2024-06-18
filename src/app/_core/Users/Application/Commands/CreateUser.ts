import { Auth } from "../../../Auth/Domain/Entities/Auth"
import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { UserRepository } from "../../Domain/Repositories/UserRepository"
import { User } from "../../Domain/Entities/User"
import { Email } from "../../Domain/VOs/Email"
import { AuthRepository } from "../../../Auth/Domain/Repositories/AuthRepository"
import { UserPrimitive } from "../../Domain/Primitives/UserPrimitive"
import { UserAlreadyExists } from "../../Domain/Exceptions/UserAlreadyExists"
import { PermissionType } from "../../../Shared/Domain/VOs/Permission"

export class CreateUser {

    constructor(
        private userRepository: UserRepository,
        private authRepository: AuthRepository,
        private eventBus: EventBus,
    ) {}

    public async run({ email, password, permissions }: { email: string, password: string, permissions: PermissionType[] }): Promise<UserPrimitive> {
        const existingUser = await this.userRepository.findByEmail(new Email(email))

        if (existingUser.isSome()) {
            throw new UserAlreadyExists(email)
        }

        const user = User.create({ email, permissions })
        const auth = Auth.create({ userId: user.id, password })

        await Promise.all([
            this.userRepository.save(user),
            this.authRepository.save(auth)
        ])

        this.eventBus.publish(user.pullDomainEvents());
        this.eventBus.publish(auth.pullDomainEvents());

        return user.toPrimitives();
    }
}