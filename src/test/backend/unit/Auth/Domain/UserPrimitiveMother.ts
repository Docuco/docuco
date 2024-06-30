import { Permission } from "../../../../../app/_core/Shared/Domain/VOs/Permission";
import { UserPrimitive } from "../../../../../app/_core/Users/Domain/Primitives/UserPrimitive";
import { DeepPartial } from "../../Shared/Infrastructure/DeepPartial";
import { faker } from '@faker-js/faker';

export class UserPrimitiveMother {

    public static random(): UserPrimitive {
        return UserPrimitiveMother.from({});
    }

    public static from(data: DeepPartial<UserPrimitive>): UserPrimitive {
        const id = data.id ?? faker.string.uuid();
        const email = data.email ?? faker.internet.email();
        const permissions = data.permissions ?? faker.helpers.arrayElements(Permission.ValidValues);
        const createdAt = data.createdAt ?? faker.date.past().getTime();
        const updatedAt = data.updatedAt ?? faker.date.recent().getTime();

        return {
            id,
            email,
            permissions,
            createdAt,
            updatedAt,
        }
    }
}