import { uuidv7 } from "uuidv7";
import { InvalidApiKeyValue } from "../Exceptions/InvalidApiKeyValue";

export class ApiKeyValue {

    public constructor(
        private _value: string,
    ) {
        this.ensureIsValid(_value)
    }

    get value(): string {
        return this._value;
    }

    public static generate(): ApiKeyValue {
        return new ApiKeyValue(uuidv7())
    }

    private ensureIsValid(value: string): void {
        // throw new InvalidApiKeyValue(value);
    }
}