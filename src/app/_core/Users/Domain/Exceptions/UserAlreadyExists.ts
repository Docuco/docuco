import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { ErrorCode } from '../../../Shared/Domain/Exceptions/ErrorCode';

export class UserAlreadyExists extends BaseException {

    constructor(email: string) {
        super(
            ErrorCode.UserAlreadyExists,
            `User with email "${email}" not found.`,
            {
                email,
            },
        );
        Object.setPrototypeOf(this, UserAlreadyExists.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}