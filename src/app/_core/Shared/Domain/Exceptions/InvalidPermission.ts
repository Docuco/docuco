import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { ErrorCode } from './ErrorCode';

export class InvalidPermission extends BaseException {

    constructor(permission: string) {
        super(
            ErrorCode.InvalidPermission,
            `The permission "${permission}" is invalid.`,
            {
                permission,
            },
        );
        Object.setPrototypeOf(this, InvalidPermission.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}