import { AggregateRoot } from "../../../Shared/Domain/AggregateRoot";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { UserCreated } from "../Events/UserCreated";
import { UserPrimitive } from "../Primitives/UserPrimitive";
import { Email } from "../VOs/Email";

export class User extends AggregateRoot {

    constructor(
        private _id: Id,
        private _email: Email,
        private _createdAt: Date,
        private _updatedAt: Date
    ) {
        super();
    }

    get id() {
        return this._id;
    }

    static create({ email }: { email: string }) {
        const primitive: UserPrimitive = {
            id: Id.generate().value,
            email: email,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        const user = User.fromPrimitives(primitive);

        user.record(new UserCreated({
            entityId: user._email.value,
            attributes: user.toPrimitives(),
        }));

        return user;
    }

    static fromPrimitives(primitives: UserPrimitive) {
        return new User(
            new Id(primitives.id),
            new Email(primitives.email),
            new Date(primitives.createdAt),
            new Date(primitives.updatedAt),
        );
    }

    toPrimitives(): UserPrimitive {
        return {
            id: this._id.value,
            email: this._email.value,
            createdAt: this._createdAt.getTime(),
            updatedAt: this._updatedAt.getTime(),
        };
    }
}