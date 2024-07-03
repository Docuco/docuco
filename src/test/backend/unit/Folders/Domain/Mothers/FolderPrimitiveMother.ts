import { FolderPrimitive } from "../../../../../../app/_core/Folders/Domain/Primitives/FolderPrimitive";
import { DeepPartial } from "../../../Shared/Infrastructure/DeepPartial";
import { faker } from '@faker-js/faker';

export class FolderPrimitiveMother {

    public static random(): FolderPrimitive {
        return FolderPrimitiveMother.from({});
    }

    public static from(data: DeepPartial<FolderPrimitive>): FolderPrimitive {
        const id = data.id ?? faker.string.uuid();
        const name = data.name ?? faker.lorem.words({ min: 2, max: 4 });
        const parentFolderId = data.parentFolderId === undefined
            ? faker.helpers.arrayElement([null, faker.string.uuid()])
            : data.parentFolderId
        const isDeleted = data.isDeleted === undefined
            ? faker.datatype.boolean()
            : data.isDeleted
        const createdAt = data.createdAt ?? faker.date.past().getTime();
        const updatedAt = data.updatedAt ?? faker.date.recent().getTime();

        return {
            id,
            name,
            parentFolderId,
            isDeleted,
            createdAt,
            updatedAt,
        }
    }
}