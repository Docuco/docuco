import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';
import { ErrorCode } from '../../../Shared/Domain/Exceptions/ErrorCode';

export class FolderNotFound extends BaseException {

    constructor(id: string) {
        super(
            ErrorCode.FolderNotFound,
            `Folder with id "${id}" not found.`,
            {
                id,
            },
        );
        Object.setPrototypeOf(this, FolderNotFound.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}