import { UserRepository } from "../Repositories/UserRepository";
import { User } from "../Entities/User";
import { UserNotFound } from "../Exceptions/UserNotFound";
import { Email } from "../VOs/Email";

export class UserFinder {

    constructor(
        private userRepository: UserRepository,
    ) {}

    public async run(emailPrimitive: string): Promise<User> {
        const email = new Email(emailPrimitive)
        const user = await this.userRepository.find(email)

        if (!user) {
            throw new UserNotFound(email);
        }

        return user
    }
}