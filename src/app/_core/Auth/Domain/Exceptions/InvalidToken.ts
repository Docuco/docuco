import { BaseException } from "../../../Shared/Domain/Exceptions/BaseException";

export class InvalidToken extends BaseException {

    constructor() {
        super(
            `The token is invalid.`,
            {}
        );
        Object.setPrototypeOf(this, InvalidToken.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}