import { Auth } from '../Entities/Auth';
import { InvalidToken } from '../Exceptions/InvalidToken';
import { User } from '../../../Users/Domain/Entities/User';
import { Token } from './Token';
import { PermissionType } from '../../../Shared/Domain/VOs/Permission';

export interface UserTokenPayload {
    authId: string;
    userId: string;
    permissions: PermissionType[];
}

export class UserToken {

    private _value: string;
    private secretKey: string;

    private constructor(secretKey: string, value: string) {
        this.secretKey = secretKey;
        this._value = value;
    }

    public get value(): string {
        return this._value;
    }

    public static generate(secretKey: string, user: User, auth: Auth): UserToken {
        const payload: UserTokenPayload = {
            authId: auth.id.value,
            userId: user.id.value,
            permissions: user.permissions.values.map((permission) => permission.value),
        }
        const token = Token.generate(secretKey, payload);

        return new UserToken(secretKey, token);
    }

    public static reconstructor(secretKey: string, value: string): UserToken {
        if (!Token.isValid(secretKey, value)) {
            throw new InvalidToken();
        }

        return new UserToken(secretKey, value);
    }

    public get payload(): UserTokenPayload {
        return UserToken.extractPayload(this.value);
    }

    static extractPayload(token: string): UserTokenPayload {
        return Token.extractPayload<UserTokenPayload>(token);
    }

    public isValid(): boolean {
        return Token.isValid(this.secretKey, this.value);
    }
}