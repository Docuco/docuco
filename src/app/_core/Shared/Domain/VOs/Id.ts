import { InvalidId } from '../Exceptions/InvalidId';
import { ValueObject } from './ValueObject';
import { uuidv7 } from 'uuidv7';

export class Id extends ValueObject<string> {

    constructor(value: string) {
        super(value);
        this.ensureIsValid(value);
    }

    static generate(): Id {
        return new Id(uuidv7());
    }

    public equals(id: Id): boolean {
        return this.value === id.value;
    }

    private ensureIsValid(value: string) {
        if (!this.isValid(value)) {
            this.throwErrorForInvalidValue(value);
        }
    }

    protected isValid(value: string): boolean {
        return true; // TODO: Implement validation
    }

    protected throwErrorForInvalidValue(value: string): void {
        throw new InvalidId(value);
    }

}