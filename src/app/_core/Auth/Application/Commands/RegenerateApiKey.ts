import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { ApiKeyRepository } from "../../Domain/Repositories/ApiKeyRepository";
import { ApiKeyFinder } from "../../Domain/Services/ApiKeyFinder";

export class RegenerateApiKey {

    constructor(
        private apiKeyFinder: ApiKeyFinder,
        private apiKeyRepository: ApiKeyRepository,
        private eventBus: EventBus,
    ) {}

    public async run(apiKeyValue: string): Promise<void> {
        const apiKey = await this.apiKeyFinder.run(apiKeyValue);

        apiKey.regenerate()
        
        await this.apiKeyRepository.save(apiKey);

        await this.eventBus.publish(apiKey.pullDomainEvents())
    }
}