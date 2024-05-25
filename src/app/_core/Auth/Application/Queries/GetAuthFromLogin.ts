import { AccountFinder } from "../../../Accounts/Domain/Services/AccountFinder";
import { AuthNotFound } from "../../Domain/Exceptions/AuthNotFound";
import { AuthRepository } from "../../Domain/Repositories/AuthRepository";
import { AuthDTO } from "../DTOs/AuthResponse";

export class GetAuthFromLogin {

    constructor(
        private accountFinder: AccountFinder,
        private authRepository: AuthRepository,
    ) {}

    public async run({ email, password }: { email: string, password: string }): Promise<AuthDTO> {
        const account = await this.accountFinder.run(email);
        const auth = await this.authRepository.findByAccountId(account.id);

        if (!auth) {
            throw new AuthNotFound(account.id.value);
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