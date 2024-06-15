import { InvalidToken } from '../Exceptions/InvalidToken';
import { ApiKey } from '../Entities/ApiKey';
import { Token } from './Token';

export interface ApiKeyTokenPayload {
    apiKeyName: string;
    permissions: string[];
}

export class ApiKeyToken {

    private _value: string;
    private secretKey: string;

    private constructor(secretKey: string, value: string) {
        this.secretKey = secretKey;
        this._value = value;
    }

    public get value(): string {
        return this._value;
    }

    public static generate(secretKey: string, apiKey: ApiKey): ApiKeyToken {
        const payload: ApiKeyTokenPayload = {
            apiKeyName: apiKey.name,
            permissions: apiKey.permissions.values.map((permission) => permission.value),
        }

        const token = Token.generate(secretKey, payload);

        return new ApiKeyToken(secretKey, token);
    }

    public static reconstructor(secretKey: string, value: string): ApiKeyToken {
        if (!Token.isValid(secretKey, value)) {
            throw new InvalidToken();
        }

        return new ApiKeyToken(secretKey, value);
    }

    public get payload(): ApiKeyTokenPayload {
        return ApiKeyToken.extractPayload(this.value);
    }

    static extractPayload(token: string): ApiKeyTokenPayload {
        return Token.extractPayload<ApiKeyTokenPayload>(token);
    }

    public isValid(): boolean {
        return Token.isValid(this.secretKey, this.value);
    }
}