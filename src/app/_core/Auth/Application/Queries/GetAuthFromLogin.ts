import { UserFinder } from "../../../Users/Domain/Services/UserFinder";
import { AuthNotFound } from "../../Domain/Exceptions/AuthNotFound";
import { AuthRepository } from "../../Domain/Repositories/AuthRepository";
import { AuthDTO } from "../DTOs/AuthResponse";

export class GetAuthFromLogin {

    constructor(
        private userFinder: UserFinder,
        private authRepository: AuthRepository,
    ) {}

    public async run({ email, password }: { email: string, password: string }): Promise<AuthDTO> {
        const user = await this.userFinder.run(email);
        const auth = await this.authRepository.findByUserId(user.id);

        if (!auth) {
            throw new AuthNotFound(user.id.value);
        }

        auth.validatePassword(password);

        return {
            accessToken: auth.accessToken,
            // refreshToken: auth.refreshToken,
            expiresIn: auth.expiresIn,
            tokenType: 'Bearer',
        }
    }
}