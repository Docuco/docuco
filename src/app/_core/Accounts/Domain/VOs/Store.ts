import { EnumValueObject } from "../../../Shared/VOs/EnumValueObject";
import { Mutable } from "../../../Shared/utils";
import { InvalidStore } from "../Exceptions/InvalidStore";

export type StoreType = (typeof Store.ValidValues)[number];

export class Store extends EnumValueObject<StoreType> {

    protected static readonly OPTIONS = [
        'InMemory',
        'Amazon S3',
    ] as const;

    public static readonly ValidValues = Store.OPTIONS as Mutable<typeof Store.OPTIONS>;

    constructor(_value: StoreType) {
        super(_value, Store.ValidValues);
    }

    static isValid(value: StoreType): boolean {
        return Store.ValidValues.includes(value);
    }

    protected throwErrorForInvalidValue(value: StoreType): void {
        throw new InvalidStore(value);
    }

}
