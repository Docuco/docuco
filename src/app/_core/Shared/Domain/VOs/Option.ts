import { BaseException } from '../Exceptions/BaseException';
import { CantGetValueFromOption } from '../Exceptions/CantGetValueFromOption';

type None = { kind: 'none'; };
type Some<Data> = { kind: 'some'; someValue: Data };

type OptionValue<Data> = None | Some<Data>;

export class Option<Data> {

    protected constructor(protected readonly value: OptionValue<Data>) { }

    isSome(): boolean {
        return this.value.kind === 'some';
    }

    isNone(): boolean {
        return this.value.kind === 'none';
    }

    fold<T>(leftFn: () => T, rightFn: (someValue: Data) => T): T {
        switch (this.value.kind) {
            case 'none':
                return leftFn();
            case 'some':
                return rightFn(this.value.someValue);
        }
    }

    get(): Data {
        return this.getOrThrow(new CantGetValueFromOption());
    }

    getOrElse(defaultValue: Data): Data {
        return this.fold(() => defaultValue, someValue => someValue);
    }

    flatMap<T>(f: (wrapped: Data) => Option<T>): Option<T> {
        return this.fold(
            () => Option.none(),
            someValue => f(someValue),
        );
    }

    map<T>(f: (wrapped: Data) => T): Option<T> {
        return this.flatMap(data => Option.fromValue(f(data)));
    }

    check(f: (wrapped: Data) => boolean): boolean {
        return this.fold(
            () => false,
            data => f(data),
        );
    }

    equals(
        optionData: Option<Data>,
        equalFn: (wrappedData: Data, data: Data) => boolean = (wrappedData: Data, data: Data) => wrappedData === data,
    ): boolean {
        return this.fold(
            () => optionData.isNone(),
            data => optionData.isSome() && equalFn(data, optionData.get()),
        );
    }

    getOrThrow(error: BaseException): Data {
        const throwFn = () => {
            throw error;
        };

        return this.fold(
            () => throwFn(),
            someValue => someValue,
        );
    }

    // Careful, use this only to extract outside the domain (ex: to transform to DTOs)
    getOrNull(): Data | null {
        return this.fold(
            () => null,
            someValue => someValue,
        );
    }

    // Careful, use this only to extract outside the domain (ex: to transform to DTOs)
    getOrUndefined(): Data | undefined {
        return this.fold(
            () => undefined,
            someValue => someValue,
        );
    }

    static some<Data>(value: Data): Option<Data> {
        if (!value) {
            throw Error('Provided value must not be empty');
        }

        return new Option({ kind: 'some', someValue: value });
    }

    static none<Data>(): Option<Data> {
        return new Option({ kind: 'none' });
    }

    static fromValue<Data>(value: Data | undefined | null): Option<Data> {
        return !value ? Option.none() : Option.some(value);
    }

}
