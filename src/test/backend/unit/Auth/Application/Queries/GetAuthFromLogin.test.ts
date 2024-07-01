import { deepEqual, instance, reset, when } from "ts-mockito";
import { ApiKey } from "../../../../../../app/_core/Auth/Domain/Entities/ApiKey";
import { ApiKeyPrimitiveMother } from "../../Domain/Mothers/ApiKeyPrimitiveMother";
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
import { expectToThrow } from "../../../Shared/Infrastructure/ExpectoToThrow";
import { InvalidLogin } from "../../../../../../app/_core/Auth/Domain/Exceptions/InvalidLogin";

describe('GetAuthFromLogin', () => {

    const userRepositoryMock = new InterfaceMock<UserRepository>();
    const authRepositoryMock = new InterfaceMock<AuthRepository>();

    afterEach(() => {
        userRepositoryMock.reset()
        authRepositoryMock.reset()
    });
   
    test(`
        GIVEN a credentials for existing user
        WHEN I login with the credentials
        THEN return the auth
    `, async () => {
        const userPrimitive = UserPrimitiveMother.random();
        const authPrimitive = AuthPrimitiveMother.from({
            userId: userPrimitive.id,
            password: Password.fromRaw('password').hash,
        });

        when(userRepositoryMock.mockito.findByEmail(deepEqual(new Email(userPrimitive.email))))
            .thenResolve(Option.some(User.fromPrimitives(userPrimitive)));
        when(authRepositoryMock.mockito.findByUserId(deepEqual(new Id(userPrimitive.id))))
            .thenResolve([Auth.fromPrimitives(authPrimitive)]);

        const getAuthFromLogin = new GetAuthFromLogin(
            userRepositoryMock.instance(),
            authRepositoryMock.instance(),
        );
        const auth = await getAuthFromLogin.run({
            email: userPrimitive.email,
            password: 'password',
        });

        expect(auth).toBeTruthy();
        expect(auth.accessToken).toBeTruthy();
    });

    test(`
        GIVEN a bad credentials for existing user with no password auth
        WHEN I login with the credentials
        THEN throw "InvalidLogin" exception
    `, async () => {
        const userPrimitive = UserPrimitiveMother.random();
        const authPrimitive = AuthPrimitiveMother.from({
            userId: userPrimitive.id,
            password: null,
        });

        when(userRepositoryMock.mockito.findByEmail(deepEqual(new Email(userPrimitive.email))))
            .thenResolve(Option.some(User.fromPrimitives(userPrimitive)));
        when(authRepositoryMock.mockito.findByUserId(deepEqual(new Id(userPrimitive.id))))
            .thenResolve([Auth.fromPrimitives(authPrimitive)]);

        const getAuthFromLogin = new GetAuthFromLogin(
            userRepositoryMock.instance(),
            authRepositoryMock.instance(),
        );

        await expectToThrow(
            getAuthFromLogin.run({
                email: userPrimitive.email,
                password: 'password',
            }),
            InvalidLogin
        )
    });
    
    test(`
        GIVEN a bad credentials for existing user
        WHEN I login with the credentials
        THEN throw "InvalidLogin" exception
    `, async () => {
        const userPrimitive = UserPrimitiveMother.random();
        const authPrimitive = AuthPrimitiveMother.from({
            userId: userPrimitive.id,
            password: Password.fromRaw('password').hash,
        });

        when(userRepositoryMock.mockito.findByEmail(deepEqual(new Email(userPrimitive.email))))
            .thenResolve(Option.some(User.fromPrimitives(userPrimitive)));
        when(authRepositoryMock.mockito.findByUserId(deepEqual(new Id(userPrimitive.id))))
            .thenResolve([Auth.fromPrimitives(authPrimitive)]);

        const getAuthFromLogin = new GetAuthFromLogin(
            userRepositoryMock.instance(),
            authRepositoryMock.instance(),
        );
        
        await expectToThrow(
            getAuthFromLogin.run({
                email: userPrimitive.email,
                password: 'bad password',
            }),
            InvalidLogin
        )
    });
})