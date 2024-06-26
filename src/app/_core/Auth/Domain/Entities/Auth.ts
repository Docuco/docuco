import { Password } from "../VOs/Password";
import { AggregateRoot } from "../../../Shared/Domain/AggregateRoot";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { AuthPrimitive } from "../Primitives/AuthPrimitive";
import { AuthCreated } from "../Events/AuthCreated";
import { UserToken } from "../VOs/UserToken";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { User } from "../../../Users/Domain/Entities/User";
import { AuthDoesNotHavePasswordToValidate } from "../Exceptions/AuthDoesNotHavePasswordToValidate";
import { AuthPasswordChanged } from "../Events/AuthPasswordChanged";
import { AuthDeleted } from "../Events/AuthDeleted";

export class Auth extends AggregateRoot {

    constructor(
        private _id: Id,
        private _userId: Id,
        // TODO: the option password is because the auth could be from oauth in the future  
        private _password: Option<Password>,
        private _createdAt: Date,
        private _updatedAt: Date
    ) {
        super();
    }
    
    get id(): Id {
        return this._id
    }

    get userId(): Id {
        return this._userId
    }

    getAccessToken(user: User): UserToken {
        return UserToken.generate(process.env.JWT_SECRET!, user, this);
    }

    public validatePassword(password: string) {
        if (this._password.isNone()) {
            throw new AuthDoesNotHavePasswordToValidate();
        }

        return this._password.get().match(password);
    }

    public isPasswordAuth() {
        return this._password ? true : false;
    }

    public changePassword(newPassword: string) {
        this._password = Option.some(Password.fromRaw(newPassword));
        this._updatedAt = new Date();

        this.record(new AuthPasswordChanged({
            entityId: this._id.value,
            attributes: this.toPrimitives(),
        }));
    }

    public delete() {
        this.record(new AuthDeleted({
            entityId: this._id.value,
            attributes: this.toPrimitives(),
        }));
    }

    public static create({ userId, password }: { userId: Id, password: string }) {
        const primitive: AuthPrimitive = {
            id: Id.generate().value,
            userId: userId.value,
            password: Password.fromRaw(password).hash,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        const auth = Auth.fromPrimitives(primitive);

        auth.record(new AuthCreated({
            entityId: auth._id.value,
            attributes: auth.toPrimitives(),
        }));

        return auth;
    }

    public static fromPrimitives(primitives: AuthPrimitive) {
        return new Auth(
            new Id(primitives.id),
            new Id(primitives.userId),
            Option.fromValue(primitives.password).map((password) => Password.fromHash(password)),
            new Date(primitives.createdAt),
            new Date(primitives.updatedAt),
        );
    }

    public toPrimitives(): AuthPrimitive {
        return {
            id: this._id.value,
            userId: this._userId.value,
            password: this._password.map((password) => password.hash).getOrNull(),
            createdAt: this._createdAt.getTime(),
            updatedAt: this._updatedAt.getTime(),
        };
    }
}