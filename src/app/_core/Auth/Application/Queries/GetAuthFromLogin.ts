import { UserRepository } from "../../../Users/Domain/Repositories/UserRepository";
import { Email } from "../../../Users/Domain/VOs/Email";
import { InvalidLogin } from "../../Domain/Exceptions/InvalidLogin";
import { AuthRepository } from "../../Domain/Repositories/AuthRepository";
import { Token } from "../../Domain/VOs/Token";
import { AuthDTO } from "../DTOs/AuthResponse";

export class GetAuthFromLogin {

    constructor(
        private userRepository: UserRepository,
        private authRepository: AuthRepository,
    ) {}

    public async run({ email, password }: { email: string, password: string }): Promise<AuthDTO> {
        const userOptional = await this.userRepository.findByEmail(new Email(email));
        const user = userOptional.getOrThrow(new InvalidLogin());

        const auths = await this.authRepository.findByUserId(user.id);
        const passwordAuth = auths.find(auth => auth.isPasswordAuth());
        if (!passwordAuth) {
            throw new InvalidLogin();
        }

        try {
            passwordAuth.validatePassword(password);
        } catch (error) {
            throw new InvalidLogin();
        }

        return {
            accessToken: passwordAuth.getAccessToken(user).value,
            // refreshToken: auth.refreshToken,
            expiresIn: Token.expiresIn,
            tokenType: 'Bearer',
        }
    }
}