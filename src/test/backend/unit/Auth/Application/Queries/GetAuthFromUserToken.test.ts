import { deepEqual, instance, mock, reset, when } from "ts-mockito";
import { GetAuthFromLogin } from "../../../../../../app/_core/Auth/Application/Queries/GetAuthFromLogin";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { UserRepository } from "../../../../../../app/_core/Users/Domain/Repositories/UserRepository";
import { AuthRepository } from "../../../../../../app/_core/Auth/Domain/Repositories/AuthRepository";
import { AuthPrimitiveMother } from "../../Domain/Mothers/AuthPrimitiveMother";
import { UserPrimitiveMother } from "../../Domain/Mothers/UserPrimitiveMother";
import { Email } from "../../../../../../app/_core/Users/Domain/VOs/Email";
import { Option } from "../../../../../../app/_core/Shared/Domain/VOs/Option";
import { User } from "../../../../../../app/_core/Users/Domain/Entities/User";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { Auth } from "../../../../../../app/_core/Auth/Domain/Entities/Auth";
import { Password } from "../../../../../../app/_core/Auth/Domain/VOs/Password";
import { UserFinder } from "../../../../../../app/_core/Users/Domain/Services/UserFinder";
import { GetAuthFromUserToken } from "../../../../../../app/_core/Auth/Application/Queries/GetAuthFromUserToken";
import { expectToThrow } from "../../../Shared/Infrastructure/ExpectoToThrow";
import { InvalidToken } from "../../../../../../app/_core/Auth/Domain/Exceptions/InvalidToken";
import { sleep } from "../../../Shared/Domain/Sleep";
import { AuthNotFound } from "../../../../../../app/_core/Auth/Domain/Exceptions/AuthNotFound";

describe('GetAuthFromUserToken', () => {

    const userFinderMock = mock(UserFinder);
    const authRepositoryMock = new InterfaceMock<AuthRepository>();

    afterEach(() => {
        reset(userFinderMock)
        authRepositoryMock.reset()
    });
   
    test(`
        GIVEN a token for existing user
        WHEN I login with the token
        THEN return a new auth
    `, async () => {
        const userPrimitive = UserPrimitiveMother.random();
        const authPrimitive = AuthPrimitiveMother.from({
            userId: userPrimitive.id,
        });
        const token = Auth.fromPrimitives(authPrimitive).getAccessToken(User.fromPrimitives(userPrimitive));

        when(userFinderMock.run(userPrimitive.id))
            .thenResolve(User.fromPrimitives(userPrimitive));
        when(authRepositoryMock.mockito.findById(deepEqual(new Id(authPrimitive.id))))
            .thenResolve(Option.some(Auth.fromPrimitives(authPrimitive)));

        const getAuthFromUserToken = new GetAuthFromUserToken(
            instance(userFinderMock),
            authRepositoryMock.instance(),
        );
        const auth = await getAuthFromUserToken.run(token.value);

        expect(auth).toBeTruthy();
        expect(auth.accessToken).toBeTruthy();
    });

    test(`
        GIVEN a invalid token
        WHEN I login with the token
        THEN throw "InvalidToken" exception
    `, async () => {
        const getAuthFromUserToken = new GetAuthFromUserToken(
            instance(userFinderMock),
            authRepositoryMock.instance(),
        );
        await expectToThrow(
            getAuthFromUserToken.run('bad token'),
            InvalidToken
        )
    });

    test(`
        GIVEN a token for existing user
        AND auth not exist
        WHEN I login with the token
        THEN throw "AuthNotFound" exception
    `, async () => {
        const userPrimitive = UserPrimitiveMother.random();
        const authPrimitive = AuthPrimitiveMother.from({
            userId: userPrimitive.id,
        });
        const token = Auth.fromPrimitives(authPrimitive).getAccessToken(User.fromPrimitives(userPrimitive));

        when(userFinderMock.run(userPrimitive.id))
            .thenResolve(User.fromPrimitives(userPrimitive));
        when(authRepositoryMock.mockito.findById(deepEqual(new Id(authPrimitive.id))))
            .thenResolve(Option.none());

        const getAuthFromUserToken = new GetAuthFromUserToken(
            instance(userFinderMock),
            authRepositoryMock.instance(),
        );
        
        await expectToThrow(
            getAuthFromUserToken.run(token.value),
            AuthNotFound
        )
    });
})