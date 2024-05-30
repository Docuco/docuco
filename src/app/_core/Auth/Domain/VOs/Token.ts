import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Id } from '../../../Shared/Domain/VOs/Id';
import { Auth } from '../Entities/Auth';
import { InvalidToken } from '../Exceptions/InvalidToken';
import { User } from '../../../Users/Domain/Entities/User';

export class TokenPayload {

    private userId: Id;

    constructor(userId: Id) {
        this.userId = userId;
    }

    public getUserId(): Id {
        return this.userId;
    }
}

export class Token {

    private _value: string;
    private secretKey: string;
    private tokenPayload: TokenPayload;

    private constructor(secretKey: string, value: string) {
        this.secretKey = secretKey;
        this._value = value;
        this.tokenPayload = this.getTokenPayload();
    }

    public static generate(secretKey: string, user: User, auth: Auth): Token {
        const token = jwt.sign(
            {
                authId: auth.id.value,
                userId: user.id.value,
                permissions: user.permissions.values.map((permission) => permission.value),
            },
            secretKey,
            {
                expiresIn: auth.expiresIn,
            },
        );

        return new Token(secretKey, token);
    }

    public static reconstructor(secretKey: string, value: string): Token {
        const token = new Token(secretKey, value);
        if (!token.isValid()) {
            throw new InvalidToken();
        }

        return token;
    }

    private getTokenPayload(): TokenPayload {
        const tokenDecoded = jwt.decode(this.value, {
            complete: true,
            json: true,
        }) as { [key: string]: any; } | null;

        if (!tokenDecoded || !tokenDecoded.payload || !tokenDecoded.payload.userId) {
            throw new InvalidToken();
        }

        return new TokenPayload(new Id(tokenDecoded.payload.userId));
    }

    public get value(): string {
        return this._value;
    }

    public isValid(): boolean {
        try {
            jwt.verify(this.value, this.secretKey, { complete: true });

            return true;
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                throw new InvalidToken();
            }

            return false;
        }
    }

    public getUserId(): Id {
        return this.tokenPayload.getUserId();
    }

}