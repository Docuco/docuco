import { BaseException } from "../../../Shared/Exceptions/BaseException";
import { Database } from "../VOs/Database";

export class InvalidDatabase extends BaseException {

    constructor(database: string) {
        super(
            `The database "${database}" is invalid`,
            {
                database,
                validValues: Database.ValidValues,
            },
        );
        Object.setPrototypeOf(this, InvalidDatabase.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}