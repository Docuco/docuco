import { BaseException } from './BaseException';
import { ErrorCode } from './ErrorCode';

export class CantGetValueFromOption extends BaseException { // TODO: it's not a domain exception and shouldn't has ErrorCode

    constructor() {
        super(
            ErrorCode.CantGetValueFromOption,
            'Can\'t get value from Option'
        );
        Object.setPrototypeOf(this, CantGetValueFromOption.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}
