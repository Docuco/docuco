import { BaseException } from '../../../Shared/Domain/Exceptions/BaseException';

export class SharedDocuFileNotFound extends BaseException {

    constructor(sharedToken: string) {
        super(
            `Docufile with shared token "${sharedToken}" not found.`,
            {
                sharedToken,
            },
        );
        Object.setPrototypeOf(this, SharedDocuFileNotFound.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}