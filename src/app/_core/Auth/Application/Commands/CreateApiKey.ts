import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { ApiKey } from "../../Domain/Entities/ApiKey";
import { ApiKeyRepository } from "../../Domain/Repositories/ApiKeyRepository";
import { CreateApiKeyDTO } from "../DTOs/CreteApiKeyDTO";

export class CreateApiKey {

    constructor(
        private apiKeyRepository: ApiKeyRepository,
        private eventBus: EventBus,
    ) {}

    public async run(apiKeyToCreate: CreateApiKeyDTO): Promise<void> {
        const apiKey = ApiKey.create(apiKeyToCreate)

        await this.apiKeyRepository.save(apiKey)

        this.eventBus.publish(apiKey.pullDomainEvents())
    }
}