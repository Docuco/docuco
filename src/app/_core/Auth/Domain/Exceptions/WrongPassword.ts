import { BaseException } from "../../../Shared/Domain/Exceptions/BaseException";

export class WrongPassword extends BaseException {

    constructor(password: string) {
        super(
            `The password "${password}" is wrong.`,
            {
                password,
            }
        );
        Object.setPrototypeOf(this, WrongPassword.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }

}