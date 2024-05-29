import { customAlphabet } from "nanoid";
import { InvalidSharedToken } from "../Exceptions/InvalidSharedToken";

export class SharedToken {

    public constructor(
        private _value: string,
    ) {
        this.ensureIsValid(_value)
    }

    get value(): string {
        return this._value;
    }

    public static generate(): SharedToken {
        const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 27)
        return new SharedToken(nanoid())
    }

    private ensureIsValid(value: string): void {
        if (value.length !== 27) {
            throw new InvalidSharedToken(value)
        }
    }
}