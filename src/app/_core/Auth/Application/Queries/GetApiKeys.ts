import { ApiKey } from "../../Domain/Entities/ApiKey";
import { ApiKeyRepository } from "../../Domain/Repositories/ApiKeyRepository";

export class GetApiKeys {

    constructor(
        private apiKeyRepository: ApiKeyRepository,
    ) {}

    public async run(): Promise<ApiKey[]> {
        return this.apiKeyRepository.getAll();
    }
}