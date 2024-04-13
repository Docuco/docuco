import { BaseException } from '../../../Shared/Exceptions/BaseException';
import { Id } from '../../../Shared/VOs/Id';
import { Email } from '../VOs/Email';

export class AccountNotFound extends BaseException {

    constructor(email: Email) {
        super(
            `Account with email "${email.value}" not found.`,
            {
                email,
            },
        );
        Object.setPrototypeOf(this, AccountNotFound.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}