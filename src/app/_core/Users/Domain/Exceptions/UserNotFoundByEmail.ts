import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';

export class UserNotFoundByEmail extends BaseException {

    constructor(email: string) {
        super(
            `User with email "${email}" not found.`,
            {
                email,
            },
        );
        Object.setPrototypeOf(this, UserNotFoundByEmail.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}