import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { Email } from '../VOs/Email';

export class UserNotFound extends BaseException {

    constructor(email: string) {
        super(
            `User with email "${email}" not found.`,
            {
                email,
            },
        );
        Object.setPrototypeOf(this, UserNotFound.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}