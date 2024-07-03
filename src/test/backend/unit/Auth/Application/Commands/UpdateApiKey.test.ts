import { anything, instance, mock, reset, when } from "ts-mockito";
import { ApiKeyRepository } from "../../../../../../app/_core/Auth/Domain/Repositories/ApiKeyRepository";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { ApiKeyFinder } from "../../../../../../app/_core/Auth/Domain/Services/ApiKeyFinder";
import { ApiKeyPrimitiveMother } from "../../Domain/Primitives/ApiKeyPrimitiveMother";
import { ApiKey } from "../../../../../../app/_core/Auth/Domain/Entities/ApiKey";
import { UpdateApiKey } from "../../../../../../app/_core/Auth/Application/Commands/UpdateApiKey";
import { ApiKeyUpdated } from "../../../../../../app/_core/Auth/Domain/Events/ApiKeyUpdated";

describe('UpdateApiKey', () => {

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
        WHEN I update the api key with the same data
        THEN save the api key
        AND not send any event
    `, async () => {
        const apiKeyPrimitive = ApiKeyPrimitiveMother.random();

        when(apiKeyFinderMock.run(apiKeyPrimitive.apiKeyValue)).thenResolve(ApiKey.fromPrimitives(apiKeyPrimitive));
        when(apiKeyRepositoryMock.mockito.save(anything())).thenResolve();

        const updateApiKey = new UpdateApiKey(
            instance(apiKeyFinderMock),
            apiKeyRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await updateApiKey.run({
            apiKeyValue: apiKeyPrimitive.apiKeyValue,
            apiKeyData: apiKeyPrimitive,
        });

        apiKeyRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectZeroEventsPublished();
    });

    test(`
        GIVEN an existing api key
        WHEN I update the api key name
        THEN save the api key
        AND send "ApiKeyUpdated" event with the new name
    `, async () => {
        const apiKeyPrimitive = ApiKeyPrimitiveMother.from({
            name: "old name"
        });

        when(apiKeyFinderMock.run(apiKeyPrimitive.apiKeyValue)).thenResolve(ApiKey.fromPrimitives(apiKeyPrimitive));
        when(apiKeyRepositoryMock.mockito.save(anything())).thenResolve();

        const updateApiKey = new UpdateApiKey(
            instance(apiKeyFinderMock),
            apiKeyRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await updateApiKey.run({
            apiKeyValue: apiKeyPrimitive.apiKeyValue,
            apiKeyData: {
                ...apiKeyPrimitive,
                name: "new name",
            },
        });

        apiKeyRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(ApiKeyUpdated, {
            id: apiKeyPrimitive.id,
            creatorId: apiKeyPrimitive.creatorId,
            name: "new name",
            description: apiKeyPrimitive.description,
            apiKeyValue: apiKeyPrimitive.apiKeyValue,
            permissions: apiKeyPrimitive.permissions,
        });
    });

    test(`
        GIVEN an existing api key
        WHEN I update the api key description
        THEN save the api key
        AND send "ApiKeyUpdated" event with the new description
    `, async () => {
        const apiKeyPrimitive = ApiKeyPrimitiveMother.from({
            description: "old description"
        });

        when(apiKeyFinderMock.run(apiKeyPrimitive.apiKeyValue)).thenResolve(ApiKey.fromPrimitives(apiKeyPrimitive));
        when(apiKeyRepositoryMock.mockito.save(anything())).thenResolve();

        const updateApiKey = new UpdateApiKey(
            instance(apiKeyFinderMock),
            apiKeyRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await updateApiKey.run({
            apiKeyValue: apiKeyPrimitive.apiKeyValue,
            apiKeyData: {
                ...apiKeyPrimitive,
                description: "new description",
            },
        });

        apiKeyRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(ApiKeyUpdated, {
            id: apiKeyPrimitive.id,
            creatorId: apiKeyPrimitive.creatorId,
            name: apiKeyPrimitive.name,
            description: "new description",
            apiKeyValue: apiKeyPrimitive.apiKeyValue,
            permissions: apiKeyPrimitive.permissions,
        });
    });

    test(`
        GIVEN an existing api key
        WHEN I update the api key description to null
        THEN save the api key
        AND send "ApiKeyUpdated" event with the new description
    `, async () => {
        const apiKeyPrimitive = ApiKeyPrimitiveMother.from({
            description: "old description"
        });

        when(apiKeyFinderMock.run(apiKeyPrimitive.apiKeyValue)).thenResolve(ApiKey.fromPrimitives(apiKeyPrimitive));
        when(apiKeyRepositoryMock.mockito.save(anything())).thenResolve();

        const updateApiKey = new UpdateApiKey(
            instance(apiKeyFinderMock),
            apiKeyRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await updateApiKey.run({
            apiKeyValue: apiKeyPrimitive.apiKeyValue,
            apiKeyData: {
                ...apiKeyPrimitive,
                description: null,
            },
        });

        apiKeyRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(ApiKeyUpdated, {
            id: apiKeyPrimitive.id,
            creatorId: apiKeyPrimitive.creatorId,
            name: apiKeyPrimitive.name,
            description: null,
            apiKeyValue: apiKeyPrimitive.apiKeyValue,
            permissions: apiKeyPrimitive.permissions,
        });
    });
})