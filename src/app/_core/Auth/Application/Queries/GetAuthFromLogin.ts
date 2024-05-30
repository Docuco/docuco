import { UserNotFoundByEmail } from "../../../Users/Domain/Exceptions/UserNotFoundByEmail";
import { UserRepository } from "../../../Users/Domain/Repositories/UserRepository";
import { Email } from "../../../Users/Domain/VOs/Email";
import { AuthNotFound } from "../../Domain/Exceptions/AuthNotFound";
import { AuthRepository } from "../../Domain/Repositories/AuthRepository";
import { AuthDTO } from "../DTOs/AuthResponse";

export class GetAuthFromLogin {

    constructor(
        private userRepository: UserRepository,
        private authRepository: AuthRepository,
    ) {}

    public async run({ email, password }: { email: string, password: string }): Promise<AuthDTO> {
        const user = await this.userRepository.findByEmail(new Email(email));
        if (!user) {
            throw new UserNotFoundByEmail(email);
        }

        const auths = await this.authRepository.findByUserId(user.id);

        const passwordAuth = auths.find(auth => auth.isPasswordAuth());
        if (auths.length === 0 || !passwordAuth) {
            throw new AuthNotFound(user.id.value);
        }

        passwordAuth.validatePassword(password);

        return {
            accessToken: passwordAuth.getAccessToken(user),
            // refreshToken: auth.refreshToken,
            expiresIn: passwordAuth.expiresIn,
            tokenType: 'Bearer',
        }
    }
}