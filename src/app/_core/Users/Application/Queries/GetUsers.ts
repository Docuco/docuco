import { User } from "../../Domain/Entities/User"
import { UserRepository } from "../../Domain/Repositories/UserRepository"

export class GetUsers {

    constructor(
        private userRepository: UserRepository,
    ) {}

    public async run(): Promise<User[]> {
        return this.userRepository.getAll()
    }
}