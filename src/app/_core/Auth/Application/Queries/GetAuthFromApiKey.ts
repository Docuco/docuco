import { ApiKeyFinder } from "../../Domain/Services/ApiKeyFinder";
import { Token } from "../../Domain/VOs/Token";
import { AuthDTO } from "../DTOs/AuthResponse";

export class GetAuthFromApiKey {

    constructor(
        private apiKeyFinder: ApiKeyFinder,
    ) {}

    public async run(apiKeyPrimitive: string): Promise<AuthDTO> {
        const apiKey = await this.apiKeyFinder.run(apiKeyPrimitive);

        return {
            accessToken: apiKey.getAccessToken().value,
            // refreshToken: auth.refreshToken,
            expiresIn: Token.expiresIn,
            tokenType: 'Bearer',
        }
    }
}