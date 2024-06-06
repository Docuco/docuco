import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';

export class Unauthorized extends BaseException {

    constructor(requiredPermissions: string[]) {
        super('Access not allowed', {
            requiredPermissions,
        });
        Object.setPrototypeOf(this, Unauthorized.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}
