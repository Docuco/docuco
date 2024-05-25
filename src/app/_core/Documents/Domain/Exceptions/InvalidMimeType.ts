import { BaseException } from "../../../Shared/Domain/Exceptions/BaseException";

export class InvalidMimeType extends BaseException {

    constructor(mimetype: string) {
        super(
            `The mimetype "${mimetype}" is invalid.`,
            {
                mimetype,
            }
        );
        Object.setPrototypeOf(this, InvalidMimeType.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}