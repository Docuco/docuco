import { AuthPrimitive } from "../../../../../../app/_core/Auth/Domain/Primitives/AuthPrimitive";
import { DeepPartial } from "../../../Shared/Infrastructure/DeepPartial";
import { faker } from '@faker-js/faker';

export class AuthPrimitiveMother {

    public static random(): AuthPrimitive {
        return AuthPrimitiveMother.from({});
    }

    public static from(data: DeepPartial<AuthPrimitive>): AuthPrimitive {
        const id = data.id ?? faker.string.uuid()
        const userId = data.userId ?? faker.string.uuid()
        const password = data.password === undefined
            ? faker.helpers.arrayElement([null, faker.internet.password()])
            : data.password
        const createdAt = data.createdAt ?? faker.date.past().getTime()
        const updatedAt = data.updatedAt ?? faker.date.recent().getTime()

        return {
            id,
            userId,
            password,
            createdAt,
            updatedAt,
        }
    }
}