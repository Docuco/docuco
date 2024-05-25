import { Password } from "../VOs/Password";
import { AggregateRoot } from "../../../Shared/Domain/AggregateRoot";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { AuthPrimitive } from "../Primitives/AuthPrimitive";
import { AuthCreated } from "../Events/AuthCreated";
import { Token } from "../VOs/Token";

export class Auth extends AggregateRoot {

    constructor(
        private _id: Id,
        private _accountId: Id,
        private _password: Password,
        private _createdAt: Date,
        private _updatedAt: Date
    ) {
        super();
    }
    
    get id(): Id {
        return this._id
    }

    get accountId(): Id {
        return this._accountId
    }

    get accessToken(): string {
        return Token.generate(process.env.JWT_SECRET!, this).value;
    }
    
    get expiresIn(): number {
        return 3600; // 1 hour in seconds
    }

    public validatePassword(password: string) {
        return this._password.match(password);
    }

    public static create({ accountId, password }: { accountId: Id, password: string }) {
        const primitive: AuthPrimitive = {
            id: Id.generate().value,
            accountId: accountId.value,
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
            new Id(primitives.accountId),
            Password.fromHash(primitives.password),
            new Date(primitives.createdAt),
            new Date(primitives.updatedAt),
        );
    }

    public toPrimitives(): AuthPrimitive {
        return {
            id: this._id.value,
            accountId: this._accountId.value,
            password: this._password.hash,
            createdAt: this._createdAt.getTime(),
            updatedAt: this._updatedAt.getTime(),
        };
    }
}