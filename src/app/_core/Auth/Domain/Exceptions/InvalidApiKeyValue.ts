import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';

export class InvalidApiKeyValue extends BaseException {

    constructor(apiKey: string) {
        super(
            `The api key "${apiKey}" is invalid.`,
            {
                apiKey,
            },
        );
        Object.setPrototypeOf(this, InvalidApiKeyValue.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}