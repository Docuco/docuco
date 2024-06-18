import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { ErrorCode } from '../../../Shared/Domain/Exceptions/ErrorCode';

export class AuthNotFound extends BaseException {

    constructor(userId: string) {
        super(
            ErrorCode.AuthNotFound,
            `Auth with userId "${userId}" not found.`,
            {
                userId,
            },
        );
        Object.setPrototypeOf(this, AuthNotFound.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}