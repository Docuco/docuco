import { BaseException } from '../../../Shared/Exceptions/BaseException';

export class CantComparePasswords extends BaseException {

    constructor() {
        super(
            'Can\'t compare passwords',
        );
        Object.setPrototypeOf(this, CantComparePasswords.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}