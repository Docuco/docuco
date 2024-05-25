import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';

export class AuthNotFound extends BaseException {

    constructor(accountId: string) {
        super(
            `Auth with accountId "${accountId}" not found.`,
            {
                accountId,
            },
        );
        Object.setPrototypeOf(this, AuthNotFound.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}