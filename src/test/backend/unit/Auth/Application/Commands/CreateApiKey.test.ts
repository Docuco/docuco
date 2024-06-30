import { anything, when } from "ts-mockito";
import { ApiKeyRepository } from "../../../../../../app/_core/Auth/Domain/Repositories/ApiKeyRepository";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { CreateApiKey } from "../../../../../../app/_core/Auth/Application/Commands/CreateApiKey";
import { CreateApiKeyDTOMother } from "../DTOs/CreateApiKeyDTOMother";
import { ApiKeyCreated } from "../../../../../../app/_core/Auth/Domain/Events/ApiKeyCreated";

describe('CreateApiKey', () => {

    const apiKeyRepositoryMock = new InterfaceMock<ApiKeyRepository>();
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        apiKeyRepositoryMock.reset();
        eventBusMock.reset();
    });
   
    test(`
        GIVEN an existing api key data
        WHEN I create the api key
        THEN save the api key with the data
        AND send "ApiKeyCreated" event
    `, async () => {
        const createApiKeyDTO = CreateApiKeyDTOMother.random();

        when(apiKeyRepositoryMock.mockito.save(anything())).thenResolve();

        const createApiKey = new CreateApiKey(
            apiKeyRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await createApiKey.run(createApiKeyDTO);

        apiKeyRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(ApiKeyCreated, {
            id: expect.any(String),
            creatorId: createApiKeyDTO.creatorId,
            name: createApiKeyDTO.name,
            description: createApiKeyDTO.description,
            apiKeyValue: expect.any(String),
            permissions: createApiKeyDTO.permissions,
        });
    });

    test(`
        GIVEN an existing api key data with no description
        WHEN I create the api key
        THEN save the api key with the data
        AND send "ApiKeyCreated" event with null description
    `, async () => {
        const createApiKeyDTO = CreateApiKeyDTOMother.from({
            description: null,
        });

        when(apiKeyRepositoryMock.mockito.save(anything())).thenResolve();

        const createApiKey = new CreateApiKey(
            apiKeyRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await createApiKey.run(createApiKeyDTO);

        apiKeyRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(ApiKeyCreated, {
            id: expect.any(String),
            creatorId: createApiKeyDTO.creatorId,
            name: createApiKeyDTO.name,
            description: null,
            apiKeyValue: expect.any(String),
            permissions: createApiKeyDTO.permissions,
        });
    });

    test(`
        GIVEN an existing api key data with repeated permissions
        WHEN I create the api key
        THEN save the api key with the data
        AND send "ApiKeyCreated" event with unique permissions
    `, async () => {
        const createApiKeyDTO = CreateApiKeyDTOMother.from({
            permissions: ["api_key:read", "api_key:read"]
        });

        when(apiKeyRepositoryMock.mockito.save(anything())).thenResolve();

        const createApiKey = new CreateApiKey(
            apiKeyRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await createApiKey.run(createApiKeyDTO);

        apiKeyRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(ApiKeyCreated, {
            id: expect.any(String),
            creatorId: createApiKeyDTO.creatorId,
            name: createApiKeyDTO.name,
            description: createApiKeyDTO.description,
            apiKeyValue: expect.any(String),
            permissions: ["api_key:read"],
        });
    });
})