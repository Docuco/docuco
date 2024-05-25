import { BaseException } from './BaseException';

export class InvalidId extends BaseException {

    constructor(id: string) {
        super(
            `Id "${id}" is invalid`,
            {
                id,
            },
        );
        Object.setPrototypeOf(this, InvalidId.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}