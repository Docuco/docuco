import { BaseException } from './BaseException';
import { ErrorCode } from './ErrorCode';

export class InvalidSharedToken extends BaseException {

    constructor(sharedToken: string) {
        super(
            ErrorCode.InvalidSharedToken,
            `The shared token "${sharedToken}" is invalid.`,
            {
                sharedToken,
            },
        );
        Object.setPrototypeOf(this, InvalidSharedToken.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}