import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { ErrorCode } from '../../../Shared/Domain/Exceptions/ErrorCode';

export class AuthDoesNotHavePasswordToValidate extends BaseException {

    constructor() {
        super(
            ErrorCode.AuthDoesNotHavePasswordToValidate,
            `Auth does not have password to validate.`,
            {},
        );
        Object.setPrototypeOf(this, AuthDoesNotHavePasswordToValidate.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}