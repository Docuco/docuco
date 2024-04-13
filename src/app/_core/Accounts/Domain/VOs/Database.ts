import { EnumValueObject } from "../../../Shared/VOs/EnumValueObject";
import { Mutable } from "../../../Shared/utils";
import { InvalidDatabase } from "../Exceptions/InvalidDatabase";

export type DatabaseType = (typeof Database.ValidValues)[number];

export class Database extends EnumValueObject<DatabaseType> {

    protected static readonly OPTIONS = [
        'SQLite',
        'CustomRDB',
    ] as const;

    public static readonly ValidValues = Database.OPTIONS as Mutable<typeof Database.OPTIONS>;

    constructor(_value: DatabaseType) {
        super(_value, Database.ValidValues);
    }

    static isValid(value: DatabaseType): boolean {
        return Database.ValidValues.includes(value);
    }

    protected throwErrorForInvalidValue(value: DatabaseType): void {
        throw new InvalidDatabase(value);
    }

}
