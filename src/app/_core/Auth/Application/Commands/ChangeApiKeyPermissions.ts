import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { PermissionType } from "../../../Shared/Domain/VOs/Permission";
import { ApiKeyRepository } from "../../Domain/Repositories/ApiKeyRepository";
import { ApiKeyFinder } from "../../Domain/Services/ApiKeyFinder";

export class ChangeApiKeyPermissions {

    constructor(
        private apiKeyFinder: ApiKeyFinder,
        private apiKeyRepository: ApiKeyRepository,
        private eventBus: EventBus,
    ) {}

    public async run({ apiKey: apiKeyValue, newPermissions }: { apiKey: string, newPermissions: PermissionType[] }): Promise<void> {
        const apiKey = await this.apiKeyFinder.run(apiKeyValue);

        apiKey.changePermissions(newPermissions)
        
        await this.apiKeyRepository.save(apiKey);
        this.eventBus.publish(apiKey.pullDomainEvents())
    }
}