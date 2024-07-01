import { when } from "ts-mockito";
import { ApiKeyRepository } from "../../../../../../app/_core/Auth/Domain/Repositories/ApiKeyRepository";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { ApiKey } from "../../../../../../app/_core/Auth/Domain/Entities/ApiKey";
import { GetApiKeys } from "../../../../../../app/_core/Auth/Application/Queries/GetApiKeys";
import { ApiKeyPrimitiveMother } from "../../Domain/Mothers/ApiKeyPrimitiveMother";

describe('GetApiKeys', () => {

    const apiKeyRepositoryMock = new InterfaceMock<ApiKeyRepository>();

    afterEach(() => {
        apiKeyRepositoryMock.reset();
    });
   
    test(`
        GIVEN an existing api key
        WHEN I find the api key by value
        THEN return the api key
    `, async () => {
        const apiKeyPrimitives = ApiKeyPrimitiveMother.generate();

        when(apiKeyRepositoryMock.mockito.getAll()).thenResolve(apiKeyPrimitives.map(ApiKey.fromPrimitives));

        const getApiKeys = new GetApiKeys(
            apiKeyRepositoryMock.instance(),
        );
        const apiKeys = await getApiKeys.run();

        expect(apiKeys).toEqual(apiKeyPrimitives.map(ApiKey.fromPrimitives));
    });
})