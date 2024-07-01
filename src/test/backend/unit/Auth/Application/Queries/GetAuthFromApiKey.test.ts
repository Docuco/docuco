import { instance, mock, reset, when } from "ts-mockito";
import { ApiKey } from "../../../../../../app/_core/Auth/Domain/Entities/ApiKey";
import { ApiKeyPrimitiveMother } from "../../Domain/Mothers/ApiKeyPrimitiveMother";
import { GetAuthFromApiKey } from "../../../../../../app/_core/Auth/Application/Queries/GetAuthFromApiKey";
import { ApiKeyFinder } from "../../../../../../app/_core/Auth/Domain/Services/ApiKeyFinder";

describe('GetAuthFromApiKey', () => {

    const apiKeyFinderMock = mock(ApiKeyFinder);

    afterEach(() => {
        reset(apiKeyFinderMock);
    });
   
    test(`
        GIVEN an existing api key
        WHEN I login with the api key
        THEN return the auth
    `, async () => {
        const apiKeyPrimitive = ApiKeyPrimitiveMother.random();

        when(apiKeyFinderMock.run(apiKeyPrimitive.apiKeyValue)).thenResolve(ApiKey.fromPrimitives(apiKeyPrimitive));

        const getAuthFromApiKey = new GetAuthFromApiKey(
            instance(apiKeyFinderMock),
        );
        const auth = await getAuthFromApiKey.run(apiKeyPrimitive.apiKeyValue);

        expect(auth).toBeTruthy();
        expect(auth.accessToken).toBeTruthy();
    });
})