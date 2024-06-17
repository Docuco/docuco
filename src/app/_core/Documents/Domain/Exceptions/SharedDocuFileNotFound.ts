import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { ErrorCode } from '../../../Shared/Domain/Exceptions/ErrorCode';

export class SharedDocuFileNotFound extends BaseException {

    constructor(sharedToken: string) {
        super(
            ErrorCode.SharedDocuFileNotFound,
            `Docufile with shared token "${sharedToken}" not found.`,
            {
                sharedToken,
            },
        );
        Object.setPrototypeOf(this, SharedDocuFileNotFound.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}