import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Auth } from '../Entities/Auth';
import { InvalidToken } from '../Exceptions/InvalidToken';
import { User } from '../../../Users/Domain/Entities/User';

export interface TokenPayload {
    authId: string;
    userId: string;
    permissions: string[];
}

export class Token {

    private _value: string;
    private secretKey: string;

    private constructor(secretKey: string, value: string) {
        this.secretKey = secretKey;
        this._value = value;
    }

    public static generate(secretKey: string, user: User, auth: Auth): Token {
        const payload: TokenPayload = {
            authId: auth.id.value,
            userId: user.id.value,
            permissions: user.permissions.values.map((permission) => permission.value),
        }

        return Token.signToken(secretKey, payload);
    }

    public regenerate(secretKey: string): Token {
        const payload: TokenPayload = {
            authId: this.payload.authId,
            userId: this.payload.userId,
            permissions: this.payload.permissions,
        }

        return Token.signToken(secretKey, payload);
    }

    private static signToken(secretKey: string, payload: TokenPayload): Token {
        const token = jwt.sign(
            payload,
            secretKey,
            {
                expiresIn: Auth.expiresIn,
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

    public get payload(): TokenPayload {
        return Token.extractPayload(this.value);
    }

    static extractPayload(token: string): TokenPayload {
        const tokenDecoded = jwt.decode(token, {
            complete: true,
            json: true,
        }) as { [key: string]: any; } | null;

        if (!tokenDecoded || !tokenDecoded.payload || !tokenDecoded.payload.userId) {
            throw new InvalidToken();
        }

        return {
            authId: tokenDecoded.payload.authId,
            userId: tokenDecoded.payload.userId,
            permissions: tokenDecoded.payload.permissions,
        };
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
}