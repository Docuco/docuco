import { AggregateRoot } from "../../../Shared/Domain/AggregateRoot";
import { AccountCreated } from "../Events/AccountCreated";
import { AccountSettingsChanged } from "../Events/AccountSettingsChanged";
import { AccountPrimitive } from "../Primitives/AccountPrimitive";
import { OptionalSettingsPrimitive } from "../Primitives/SettingsPrimitive";
import { Email } from "../VOs/Email";
import { Password } from "../VOs/Password";
import { Settings } from "../VOs/Settings";

export class Account extends AggregateRoot {

    constructor(
        private _email: Email,
        private _password: Password,
        private _settings: Settings,
        private _createdAt: Date,
        private _updatedAt: Date
    ) {
        super();
    }

    static create({email, password}: {email: string, password: string}) {
        const primitive: AccountPrimitive = {
            email: email,
            password: Password.fromRaw(password).hash,
            settings: Settings.default().toPrimitives(),
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

    changeSettings(newSettings: OptionalSettingsPrimitive) {
        this._settings = this._settings.change(newSettings);
        this._updatedAt = new Date();

        this.record(new AccountSettingsChanged({
            entityId: this._email.value,
            attributes: this.toPrimitives(),
        }));
    }

    static fromPrimitives(primitives: AccountPrimitive) {
        return new Account(
            new Email(primitives.email),
            Password.fromHash(primitives.password),
            Settings.fromPrimitives(primitives.settings),
            new Date(primitives.createdAt),
            new Date(primitives.updatedAt),
        );
    }

    toPrimitives(): AccountPrimitive {
        return {
            email: this._email.value,
            password: this._password.hash,
            settings: this._settings.toPrimitives(),
            createdAt: this._createdAt.getTime(),
            updatedAt: this._updatedAt.getTime(),
        };
    }
}