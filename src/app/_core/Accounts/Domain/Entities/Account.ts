import { AggregateRoot } from "../../../Shared/Domain/AggregateRoot";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { AccountCreated } from "../Events/AccountCreated";
import { AccountPrimitive } from "../Primitives/AccountPrimitive";
import { Email } from "../VOs/Email";

export class Account extends AggregateRoot {

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
        const primitive: AccountPrimitive = {
            id: Id.generate().value,
            email: email,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        const account = Account.fromPrimitives(primitive);

        account.record(new AccountCreated({
            entityId: account._email.value,
            attributes: account.toPrimitives(),
        }));

        return account;
    }

    static fromPrimitives(primitives: AccountPrimitive) {
        return new Account(
            new Id(primitives.id),
            new Email(primitives.email),
            new Date(primitives.createdAt),
            new Date(primitives.updatedAt),
        );
    }

    toPrimitives(): AccountPrimitive {
        return {
            id: this._id.value,
            email: this._email.value,
            createdAt: this._createdAt.getTime(),
            updatedAt: this._updatedAt.getTime(),
        };
    }
}