import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { InvalidToken } from '../Exceptions/InvalidToken';

export class Token {

    private constructor() {
    }

    static get expiresIn(): number {
        return 3600; // 1 hour in seconds
    }

    public static generate<T extends object>(secretKey: string, payload: T): string {
        const token = jwt.sign(
            payload,
            secretKey,
            {
                expiresIn: this.expiresIn,
            },
        );

        return token;
    }

    static extractPayload<T extends object>(token: string): T {
        const tokenDecoded = jwt.decode(token, {
            complete: true,
            json: true,
        }) as { [key: string]: any; } | null;

        if (!tokenDecoded || !tokenDecoded.payload) {
            throw new InvalidToken();
        }

        return tokenDecoded.payload as T;
    }

    static isValid(secretKey: string, value: string): boolean {
        try {
            jwt.verify(value, secretKey, { complete: true });

            return true;
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                throw new InvalidToken();
            }

            return false;
        }
    }
}