import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { ErrorCode } from '../../../Shared/Domain/Exceptions/ErrorCode';

export class CantComparePasswords extends BaseException {

    constructor() {
        super(
            ErrorCode.CantComparePasswords,
            'Can\'t compare passwords',
        );
        Object.setPrototypeOf(this, CantComparePasswords.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}