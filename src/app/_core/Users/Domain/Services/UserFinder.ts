import { UserRepository } from "../Repositories/UserRepository";
import { User } from "../Entities/User";
import { UserNotFound } from "../Exceptions/UserNotFound";
import { Id } from "../../../Shared/Domain/VOs/Id";

export class UserFinder {

    constructor(
        private userRepository: UserRepository,
    ) {}

    public async run(id: string): Promise<User> {
        const user = await this.userRepository.findById(new Id(id))

        if (!user) {
            throw new UserNotFound(id);
        }

        return user
    }
}