export class Email {
    constructor(private _value: string) {
        this.ensureIsValidEmail(_value);
    }

    private ensureIsValidEmail(value: string): void {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
            throw new Error(`Email ${value} is invalid`);
        }
    }

    get value(): string {
        return this._value;
    }
}