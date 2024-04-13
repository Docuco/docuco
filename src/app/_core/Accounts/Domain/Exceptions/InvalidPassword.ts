import { BaseException } from "../../../Shared/Exceptions/BaseException";

export class InvalidPassword extends BaseException {

    constructor(password: string) {
        super(
            `Invalid password error: ${password}: the password must be between 8 and 32 characters and have lowercase, uppercase, numbers and special characters`,
            {
                password,
            }
        );
        Object.setPrototypeOf(this, InvalidPassword.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}