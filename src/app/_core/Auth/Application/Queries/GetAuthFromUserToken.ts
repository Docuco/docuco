import { Id } from "../../../Shared/Domain/VOs/Id";
import { UserFinder } from "../../../Users/Domain/Services/UserFinder";
import { AuthNotFound } from "../../Domain/Exceptions/AuthNotFound";
import { InvalidToken } from "../../Domain/Exceptions/InvalidToken";
import { AuthRepository } from "../../Domain/Repositories/AuthRepository";
import { Token } from "../../Domain/VOs/Token";
import { UserTokenPayload } from "../../Domain/VOs/UserToken";
import { AuthDTO } from "../DTOs/AuthResponse";

export class GetAuthFromUserToken {

    constructor(
        private userFinder: UserFinder,
        private authRepository: AuthRepository,
    ) {}

    public async run(oldToken: string): Promise<AuthDTO> {
        if (!Token.isValid(process.env.JWT_SECRET!, oldToken)) {
            throw new InvalidToken();
        }
        const { userId, authId } = Token.extractPayload<UserTokenPayload>(oldToken)

        const user = await this.userFinder.run(userId);

        const authOptional = await this.authRepository.findById(new Id(authId));
        const auth = authOptional.getOrThrow(new AuthNotFound(authId));

        return {
            accessToken: auth.getAccessToken(user).value,
            // refreshToken: auth.refreshToken,
            expiresIn: Token.expiresIn,
            tokenType: 'Bearer',
        }
    }
}