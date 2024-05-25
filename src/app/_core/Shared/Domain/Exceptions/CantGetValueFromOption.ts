import { BaseException } from './BaseException';

export class CantGetValueFromOption extends BaseException {

    constructor() {
        super('Can\'t get value from Option');
        Object.setPrototypeOf(this, CantGetValueFromOption.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}
