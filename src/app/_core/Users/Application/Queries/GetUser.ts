import { User } from "../../Domain/Entities/User"
import { UserFinder } from "../../Domain/Services/UserFinder"

export class GetUser {

    constructor(
        private userFinder: UserFinder,
    ) {}

    public async run({ email }: { email: string }): Promise<User> {
        return this.userFinder.run(email)
    }
}