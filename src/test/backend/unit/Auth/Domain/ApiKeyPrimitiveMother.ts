import { ApiKeyPrimitive } from "../../../../../app/_core/Auth/Domain/Primitives/ApiKeyPrimitive";
import { Permission } from "../../../../../app/_core/Shared/Domain/VOs/Permission";
import { DeepPartial } from "../../Shared/Infrastructure/DeepPartial";
import { faker } from '@faker-js/faker';

export class ApiKeyPrimitiveMother {

    public static random(): ApiKeyPrimitive {
        return ApiKeyPrimitiveMother.from({});
    }

    public static from(data: DeepPartial<ApiKeyPrimitive>): ApiKeyPrimitive {
        const apiKeyValue = data.apiKeyValue ?? faker.string.uuid();
        const permissions = data.permissions ?? faker.helpers.arrayElements(Permission.ValidValues);
        const creatorId = data.creatorId ?? faker.string.uuid();
        const description = data.description === undefined
            ? faker.helpers.arrayElement([null, faker.lorem.sentences({ min: 1, max: 4 })])
            : data.description
        const id = data.id ?? faker.string.uuid();
        const name = data.name ?? faker.lorem.words({ min: 2, max: 4 });
        const createdAt = data.createdAt ?? faker.date.past().getTime();
        const updatedAt = data.updatedAt ?? faker.date.recent().getTime();

        return {
            apiKeyValue,
            permissions,
            creatorId,
            description,
            id,
            name,
            createdAt,
            updatedAt,
        }
    }
}