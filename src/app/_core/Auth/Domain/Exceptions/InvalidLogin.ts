import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { ErrorCode } from '../../../Shared/Domain/Exceptions/ErrorCode';

export class InvalidLogin extends BaseException {

    constructor() {
        super(
            ErrorCode.InvalidLogin,
            `The login is invalid.`,
        );
        Object.setPrototypeOf(this, InvalidLogin.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}