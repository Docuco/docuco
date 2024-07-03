import { uuidv7 } from "uuidv7";
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

    public static new(): SharedToken {
        return new SharedToken(uuidv7())
    }

    private ensureIsValid(value: string): void {
        // throw new InvalidSharedToken(value);
    }
}