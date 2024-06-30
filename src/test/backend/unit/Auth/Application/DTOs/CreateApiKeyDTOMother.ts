import { CreateApiKeyDTO } from "../../../../../../app/_core/Auth/Application/DTOs/CreateApiKeyDTO";
import { faker } from '@faker-js/faker';
import { DeepPartial } from "../../../Shared/Infrastructure/DeepPartial";
import { Permission } from "../../../../../../app/_core/Shared/Domain/VOs/Permission";

export class CreateApiKeyDTOMother {

    public static random(): CreateApiKeyDTO {
        return CreateApiKeyDTOMother.from({});
    }

    public static from(data: DeepPartial<CreateApiKeyDTO>): CreateApiKeyDTO {
        const permissions = data.permissions ?? faker.helpers.arrayElements(Permission.ValidValues);
        const creatorId = data.creatorId ?? faker.string.uuid();
        const description = data.description === undefined
            ? faker.helpers.arrayElement([null, faker.lorem.sentences({ min: 1, max: 4 })])
            : data.description
        const name = data.name ?? faker.lorem.words({ min: 2, max: 4 });

        return {
            permissions,
            creatorId,
            description,
            name,
        }
    }
}