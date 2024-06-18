import { BaseException } from './BaseException';
import { ErrorCode } from './ErrorCode';

export class InvalidId extends BaseException {

    constructor(id: string) {
        super(
            ErrorCode.InvalidId,
            `Id "${id}" is invalid`,
            {
                id,
            },
        );
        Object.setPrototypeOf(this, InvalidId.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}