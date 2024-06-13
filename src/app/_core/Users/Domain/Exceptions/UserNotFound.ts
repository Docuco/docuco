import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';

export class UserNotFound extends BaseException {

    constructor(id: string) {
        super(
            `User with id "${id}" not found.`,
            {
                id,
            },
        );
        Object.setPrototypeOf(this, UserNotFound.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}