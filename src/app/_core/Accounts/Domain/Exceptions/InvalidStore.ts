import { BaseException } from "../../../Shared/Exceptions/BaseException";
import { Store } from "../VOs/Store";

export class InvalidStore extends BaseException {

    constructor(store: string) {
        super(
            `The store "${store}" is invalid`,
            {
                store,
                validValues: Store.ValidValues,
            },
        );
        Object.setPrototypeOf(this, InvalidStore.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}