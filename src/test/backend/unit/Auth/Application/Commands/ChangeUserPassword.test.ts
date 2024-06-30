import { anything, deepEqual, when } from "ts-mockito";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { AuthRepository } from "../../../../../../app/_core/Auth/Domain/Repositories/AuthRepository";
import { ChangeUserPassword } from "../../../../../../app/_core/Auth/Application/Commands/ChangeUserPassword";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { Auth } from "../../../../../../app/_core/Auth/Domain/Entities/Auth";
import { AuthPasswordChanged } from "../../../../../../app/_core/Auth/Domain/Events/AuthPasswordChanged";
import { UserPrimitiveMother } from "../../Domain/UserPrimitiveMother";
import { AuthPrimitiveMother } from "../../Domain/AuthPrimitiveMother";
import { Password } from "../../../../../../app/_core/Auth/Domain/VOs/Password";
import { WrongPassword } from "../../../../../../app/_core/Auth/Domain/Exceptions/WrongPassword";
import { expectToThrow } from "../../../Shared/Infrastructure/ExpectoToThrow";
import { AuthNotFound } from "../../../../../../app/_core/Auth/Domain/Exceptions/AuthNotFound";

describe('ChangeUserPassword', () => {

    const authRepositoryMock = new InterfaceMock<AuthRepository>();
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        authRepositoryMock.reset();
        eventBusMock.reset();
    });
   
    test(`
        GIVEN an existing user with password auth
        WHEN I change the password for the user
        THEN save the auth with the new password
        AND send "AuthPasswordChanged" event with password hashed
    `, async () => {
        const userPrimitive = UserPrimitiveMother.random();
        const authPrimitive = AuthPrimitiveMother.from({
            password: 'old_password',
            userId: userPrimitive.id,
        });

        when(authRepositoryMock.mockito.findByUserId(deepEqual(new Id(userPrimitive.id)))).thenResolve([Auth.fromPrimitives(authPrimitive)]);
        when(authRepositoryMock.mockito.save(anything())).thenResolve();

        const changeUserPassword = new ChangeUserPassword(
            authRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await changeUserPassword.run({
            userId: userPrimitive.id,
            newPassword: 'new_password',
        });

        authRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(AuthPasswordChanged, {
            id: authPrimitive.id,
            userId: userPrimitive.id,
        });
        const eventSent = eventBusMock.getPublishedEventByName(AuthPasswordChanged)
        const newPasswordOnEvent = (eventSent?.attributes as any).password;
        expect(Password.fromHash(newPasswordOnEvent).match('new_password')).not.toThrow(WrongPassword);
    });

    test(`
        GIVEN an existing user that does not have password auth
        WHEN I try to change the password for the user
        THEN throw "AuthNotFound" exception
        AND not send any event
        AND not save the auth
    `, async () => {
        const userPrimitive = UserPrimitiveMother.random();
        const authPrimitive = AuthPrimitiveMother.from({
            password: null,
            userId: userPrimitive.id,
        });

        when(authRepositoryMock.mockito.findByUserId(deepEqual(new Id(userPrimitive.id)))).thenResolve([Auth.fromPrimitives(authPrimitive)]);

        const changeUserPassword = new ChangeUserPassword(
            authRepositoryMock.instance(),
            eventBusMock.instance(),
        );

        await expectToThrow(changeUserPassword.run({
            userId: userPrimitive.id,
            newPassword: 'new_password',
        }), AuthNotFound);

        authRepositoryMock.expectMethodNotToHaveBeenCalled('save');
        eventBusMock.expectZeroEventsPublished();
    });
})