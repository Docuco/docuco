import { BaseException } from '../../../Shared/Exceptions/BaseException';
import { Id } from '../../../Shared/VOs/Id';

export class DocuFileNotFound extends BaseException {

    constructor(id: Id) {
        super(
            `Docufile with id "${id.value}" not found.`,
            {
                id,
            },
        );
        Object.setPrototypeOf(this, DocuFileNotFound.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}