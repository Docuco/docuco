import { ErrorCode } from "./ErrorCode";

export abstract class BaseException extends Error {

    constructor(protected _code: ErrorCode, protected _message: string, protected _data?: Record<string, unknown>) {
        super();
        Object.setPrototypeOf(this, BaseException.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
    
    get code(): ErrorCode {
        return this._code;
    }

    get message(): string {
        return this._message;
    }

    get data(): Record<string, unknown> | undefined {
        return this._data;
    }

}