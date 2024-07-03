import { anything, instance, mock, reset, when } from "ts-mockito";
import { ApiKeyRepository } from "../../../../../../app/_core/Auth/Domain/Repositories/ApiKeyRepository";
import { ApiKeyFinder } from "../../../../../../app/_core/Auth/Domain/Services/ApiKeyFinder";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { ChangeApiKeyPermissions } from "../../../../../../app/_core/Auth/Application/Commands/ChangeApiKeyPermissions";
import { ApiKeyPrimitiveMother } from "../../Domain/Primitives/ApiKeyPrimitiveMother";
import { PermissionType } from "../../../../../../app/_core/Shared/Domain/VOs/Permission";
import { ApiKey } from "../../../../../../app/_core/Auth/Domain/Entities/ApiKey";
import { ApiKeyPermissionsChanged } from "../../../../../../app/_core/Auth/Domain/Events/ApiKeyPermissionsChanged";

describe('ChangeApiKeyPermissions', () => {

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
        WHEN I change the permissions for the api key
        THEN save the api key with the new permissions
        AND send "ApiKeyPermissionsChanged" event
    `, async () => {
        const apiKeyPrimitive = ApiKeyPrimitiveMother.from({
            permissions: ["api_key:read", "api_key:create", "api_key:delete"]
        });
        const newPermissions: PermissionType[] = ["api_key:read", "api_key:create"]; 

        when(apiKeyFinderMock.run(apiKeyPrimitive.apiKeyValue)).thenResolve(ApiKey.fromPrimitives(apiKeyPrimitive));
        when(apiKeyRepositoryMock.mockito.save(anything())).thenResolve();

        const changeApiKeyPermissions = new ChangeApiKeyPermissions(
            instance(apiKeyFinderMock),
            apiKeyRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await changeApiKeyPermissions.run({
            apiKey: apiKeyPrimitive.apiKeyValue,
            newPermissions,
        });

        apiKeyRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(ApiKeyPermissionsChanged, {
            id: apiKeyPrimitive.id,
            apiKeyValue: apiKeyPrimitive.apiKeyValue,
            permissions: newPermissions,
        });
    });

    test(`
        GIVEN an existing api key
        WHEN I set the same permissions for the api key
        THEN save the api key with the same permissions
        AND not send any event
    `, async () => {
        const permissions: PermissionType[] = ["api_key:read", "api_key:create"];
        const apiKeyPrimitive = ApiKeyPrimitiveMother.from({ permissions });

        when(apiKeyFinderMock.run(apiKeyPrimitive.apiKeyValue)).thenResolve(ApiKey.fromPrimitives(apiKeyPrimitive));
        when(apiKeyRepositoryMock.mockito.save(anything())).thenResolve();

        const changeApiKeyPermissions = new ChangeApiKeyPermissions(
            instance(apiKeyFinderMock),
            apiKeyRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await changeApiKeyPermissions.run({
            apiKey: apiKeyPrimitive.apiKeyValue,
            newPermissions: permissions,
        });

        apiKeyRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectZeroEventsPublished();
    });
})