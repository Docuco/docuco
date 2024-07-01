import { deepEqual, when } from "ts-mockito";
import { ApiKeyRepository } from "../../../../../../app/_core/Auth/Domain/Repositories/ApiKeyRepository";
import { ApiKeyFinder } from "../../../../../../app/_core/Auth/Domain/Services/ApiKeyFinder";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { ApiKeyPrimitiveMother } from "../Mothers/ApiKeyPrimitiveMother";
import { ApiKeyValue } from "../../../../../../app/_core/Auth/Domain/VOs/ApiKeyValue";
import { ApiKey } from "../../../../../../app/_core/Auth/Domain/Entities/ApiKey";
import { Option } from "../../../../../../app/_core/Shared/Domain/VOs/Option";
import { expectToThrow } from "../../../Shared/Infrastructure/ExpectoToThrow";
import { ApiKeyNotFound } from "../../../../../../app/_core/Auth/Domain/Exceptions/ApiKeyNotFound";

describe('ApiKeyFinder', () => {

    const apiKeyRepositoryMock = new InterfaceMock<ApiKeyRepository>();

    afterEach(() => {
        apiKeyRepositoryMock.reset();
    });
   
    test(`
        GIVEN an existing api key
        WHEN I find the api key by value
        THEN return the api key
    `, async () => {
        const apiKeyPrimitive = ApiKeyPrimitiveMother.random();

        when(apiKeyRepositoryMock.mockito.findByApiKeyValue(deepEqual(new ApiKeyValue(apiKeyPrimitive.apiKeyValue))))
            .thenResolve(Option.some(ApiKey.fromPrimitives(apiKeyPrimitive)));

        const apiKeyFinder = new ApiKeyFinder(
            apiKeyRepositoryMock.instance(),
        );
        const apiKey = await apiKeyFinder.run(apiKeyPrimitive.apiKeyValue);

        expect(apiKey).toEqual(ApiKey.fromPrimitives(apiKeyPrimitive));
    });

    test(`
        GIVEN a non existing api key
        WHEN I find the api key by value
        THEN throw "ApiKeyNotFound" exception
    `, async () => {
        const apiKeyPrimitive = ApiKeyPrimitiveMother.random();

        when(apiKeyRepositoryMock.mockito.findByApiKeyValue(deepEqual(new ApiKeyValue(apiKeyPrimitive.apiKeyValue))))
            .thenResolve(Option.none());

        const apiKeyFinder = new ApiKeyFinder(
            apiKeyRepositoryMock.instance(),
        );
        
        await expectToThrow(
            apiKeyFinder.run(apiKeyPrimitive.apiKeyValue),
            ApiKeyNotFound
        )
    });
})