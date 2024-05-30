import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';

export class AuthDoesNotHavePasswordToValidate extends BaseException {

    constructor() {
        super(
            `Auth does not have password to validate.`,
            {},
        );
        Object.setPrototypeOf(this, AuthDoesNotHavePasswordToValidate.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}