import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { ApiKeyRepository } from "../../Domain/Repositories/ApiKeyRepository";
import { ApiKeyFinder } from "../../Domain/Services/ApiKeyFinder";
import { UpdateApiKeyDTO } from "../DTOs/UpdateApiKeyDTO";

export class UpdateApiKey {

    constructor(
        private apiKeyFinder: ApiKeyFinder,
        private apiKeyRepository: ApiKeyRepository,
        private eventBus: EventBus,
    ) {}

    public async run({ apiKeyValue, apiKeyData }: {apiKeyValue: string, apiKeyData: UpdateApiKeyDTO}): Promise<void> {
        const apiKey = await this.apiKeyFinder.run(apiKeyValue);

        apiKey.update(apiKeyData)
        
        await this.apiKeyRepository.save(apiKey);
        this.eventBus.publish(apiKey.pullDomainEvents())
    }
}