import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { ErrorCode } from './ErrorCode';

export class Unauthorized extends BaseException {

    constructor(requiredPermissions: string[]) {
        super(
            ErrorCode.Unauthorized,
            'Access not allowed',
            {
                requiredPermissions,
            }
        );
        Object.setPrototypeOf(this, Unauthorized.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}
