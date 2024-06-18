import bcrypt from 'bcryptjs';
import { WrongPassword } from '../Exceptions/WrongPassword';
import { Option } from '../../../Shared/Domain/VOs/Option';

export class Password {

    private _hash: string;
    private _raw: Option<string>;

    private constructor(
        raw: Option<string>,
        hash: string
    ) {
        this._raw = raw;
        this._hash = hash;
    }

    public static fromRaw(raw: string): Password {
        this.ensureIsValid(raw)
        const hash = bcrypt.hashSync(raw, 10);

        return new Password(Option.some(raw), hash);
    }

    public static fromHash(hash: string): Password {
        return new Password(Option.none(), hash);
    }

    public get hash(): string {
        return this._hash;
    }

    private hasRawPassword(): boolean {
        return this._raw.isSome();
    }

    // public isEqual(password: Password): boolean {
    //     if (!password.hasRawPassword() && !this.hasRawPassword()) {
    //         throw new CantComparePasswords();
    //     }

    //     if (this.hasRawPassword()) {
    //         return bcrypt.compareSync(
    //             this._raw!,
    //             password.hash,
    //         );
    //     }

    //     return password.isEqual(this)
    // }

    public match(password: string): void {
        const isValid = bcrypt.compareSync(
            password,
            this.hash,
        );

        if (!isValid) {
            throw new WrongPassword(password);
        }
    }

    private static ensureIsValid(raw: string) {
        // const passwordRegex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,32}$/;

        // if (!raw.match(passwordRegex)) {
        //     throw new InvalidPassword(raw);
        // }
    }
}