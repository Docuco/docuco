import { anything, instance, mock, reset, when } from "ts-mockito";
import { ApiKeyRepository } from "../../../../../../app/_core/Auth/Domain/Repositories/ApiKeyRepository";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { ApiKeyFinder } from "../../../../../../app/_core/Auth/Domain/Services/ApiKeyFinder";
import { ApiKeyPrimitiveMother } from "../../Domain/Mothers/ApiKeyPrimitiveMother";
import { ApiKey } from "../../../../../../app/_core/Auth/Domain/Entities/ApiKey";
import { RegenerateApiKey } from "../../../../../../app/_core/Auth/Application/Commands/RegenerateApiKey";
import { ApiKeyRegenerated } from "../../../../../../app/_core/Auth/Domain/Events/ApiKeyRegenerated";

describe('RegenerateApiKey', () => {

    const apiKeyFinderMock = mock(ApiKeyFinder);
    const apiKeyRepositoryMock = new InterfaceMock<ApiKeyRepository>();
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        reset(apiKeyFinderMock);
        apiKeyRepositoryMock.reset();
        eventBusMock.reset();
    });
   
    test(`
        GIVEN an existing api key
        WHEN I regenerate the api key
        THEN save the api key
        AND send "ApiKeyRegenerated" event with the new api key value
    `, async () => {
        const apiKeyPrimitive = ApiKeyPrimitiveMother.random();

        when(apiKeyFinderMock.run(apiKeyPrimitive.apiKeyValue)).thenResolve(ApiKey.fromPrimitives(apiKeyPrimitive));
        when(apiKeyRepositoryMock.mockito.save(anything())).thenResolve();

        const regenerateApiKey = new RegenerateApiKey(
            instance(apiKeyFinderMock),
            apiKeyRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await regenerateApiKey.run(apiKeyPrimitive.apiKeyValue);

        apiKeyRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(ApiKeyRegenerated, {
            id: apiKeyPrimitive.id,
            creatorId: apiKeyPrimitive.creatorId,
            name: apiKeyPrimitive.name,
            description: apiKeyPrimitive.description,
            permissions: apiKeyPrimitive.permissions,
        });
        const eventSent = eventBusMock.getPublishedEventByName(ApiKeyRegenerated)
        const newApiKeyValue = (eventSent?.attributes as any).apiKeyValue;
        expect(newApiKeyValue).not.toEqual(apiKeyPrimitive.apiKeyValue);
        expect(newApiKeyValue).toBeTruthy();
    });
})