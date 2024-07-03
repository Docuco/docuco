import { anything, instance, mock, reset, when } from "ts-mockito";
import { ApiKeyRepository } from "../../../../../../app/_core/Auth/Domain/Repositories/ApiKeyRepository";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DeleteApiKey } from "../../../../../../app/_core/Auth/Application/Commands/DeleteApiKey";
import { ApiKeyFinder } from "../../../../../../app/_core/Auth/Domain/Services/ApiKeyFinder";
import { ApiKeyPrimitiveMother } from "../../Domain/Primitives/ApiKeyPrimitiveMother";
import { ApiKey } from "../../../../../../app/_core/Auth/Domain/Entities/ApiKey";
import { ApiKeyDeleted } from "../../../../../../app/_core/Auth/Domain/Events/ApiKeyDeleted";

describe('DeleteApiKey', () => {

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
        WHEN I delete the api key
        THEN delete the api key
        AND send "ApiKeyDeleted" event
    `, async () => {
        const apiKeyPrimitive = ApiKeyPrimitiveMother.random();

        when(apiKeyFinderMock.run(apiKeyPrimitive.apiKeyValue)).thenResolve(ApiKey.fromPrimitives(apiKeyPrimitive));
        when(apiKeyRepositoryMock.mockito.save(anything())).thenResolve();

        const deleteApiKey = new DeleteApiKey(
            instance(apiKeyFinderMock),
            apiKeyRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await deleteApiKey.run(apiKeyPrimitive.apiKeyValue);

        apiKeyRepositoryMock.expectMethodToHaveBeenCalledTimes('delete', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(ApiKeyDeleted, {
            id: apiKeyPrimitive.id,
            creatorId: apiKeyPrimitive.creatorId,
            name: apiKeyPrimitive.name,
            description: apiKeyPrimitive.description,
            apiKeyValue: apiKeyPrimitive.apiKeyValue,
            permissions: apiKeyPrimitive.permissions,
        });
    });
})