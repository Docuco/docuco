import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { ErrorCode } from '../../../Shared/Domain/Exceptions/ErrorCode';

export class ApiKeyNotFound extends BaseException {

    constructor(apiKey: string) {
        super(
            ErrorCode.ApiKeyNotFound,
            `Api key with "${apiKey}" not found.`,
            {
                apiKey,
            },
        );
        Object.setPrototypeOf(this, ApiKeyNotFound.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}