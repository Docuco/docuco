import { CreateFolderDTO } from "../../../../../../app/_core/Folders/Application/DTOs/CreateFolderDTO";
import { DeepPartial } from "../../../Shared/Infrastructure/DeepPartial";
import { faker } from '@faker-js/faker';

export class CreateFolderDTOMother {

    public static random(): CreateFolderDTO {
        return CreateFolderDTOMother.from({});
    }

    public static from(data: DeepPartial<CreateFolderDTO>): CreateFolderDTO {
        const name = data.name ?? faker.lorem.words({ min: 2, max: 4 });
        const parentFolderId = data.parentFolderId === undefined
            ? faker.helpers.arrayElement([null, faker.string.uuid()])
            : data.parentFolderId

        return {
            name,
            parentFolderId,
        }
    }
}