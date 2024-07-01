import { ApiKey } from "../Entities/ApiKey";
import { ApiKeyNotFound } from "../Exceptions/ApiKeyNotFound";
import { ApiKeyRepository } from "../Repositories/ApiKeyRepository";
import { ApiKeyValue } from "../VOs/ApiKeyValue";

export class ApiKeyFinder {

    constructor(
        private apiKeyRepository: ApiKeyRepository,
    ) {}

    public async run(apiKeyValue: string): Promise<ApiKey> {
        const apiKey = await this.apiKeyRepository.findByApiKeyValue(new ApiKeyValue(apiKeyValue))

        if (apiKey.isNone()) {
            throw new ApiKeyNotFound(apiKeyValue);
        }

        return apiKey.get()
    }
}