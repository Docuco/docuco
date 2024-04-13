import bcrypt from 'bcryptjs';
import { CantComparePasswords } from '../Exceptions/CantComparePasswords';
import { InvalidPassword } from '../Exceptions/InvalidPassword';

export class Password {

    private _hash: string;
    private _raw: string | null;

    private constructor(
        raw: string | null,
        hash: string
    ) {
        this._raw = raw;
        this._hash = hash;
    }

    public static fromRaw(raw: string): Password {
        this.ensureIsValid(raw)
        const hash = bcrypt.hashSync(raw, 10);

        return new Password(raw, hash);
    }

    public static fromHash(hash: string): Password {
        return new Password(null, hash);
    }

    public get hash(): string {
        return this._hash;
    }

    private hasRawPassword(): boolean {
        return this._raw !== null;
    }

    public isEqual(password: Password): boolean {
        if (!password.hasRawPassword() && !this.hasRawPassword()) {
            throw new CantComparePasswords();
        }

        if (this.hasRawPassword()) {
            return bcrypt.compareSync(
                this._raw!,
                password.hash,
            );
        }

        return password.isEqual(this)
    }

    private static ensureIsValid(raw: string) {
        // const passwordRegex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,32}$/;

        // if (!raw.match(passwordRegex)) {
        //     throw new InvalidPassword(raw);
        // }
    }
}