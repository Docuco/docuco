import { DocuFilePrimitive } from "../../../../../../app/_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { DocuMimeType } from "../../../../../../app/_core/Documents/Domain/VOs/DocuMimeType";
import { getRandomNumber } from "../../../Shared/Domain/GetRandomNumber";
import { DeepPartial } from "../../../Shared/Infrastructure/DeepPartial";
import { faker } from '@faker-js/faker';

export class DocuFilePrimitiveMother {

    public static random(): DocuFilePrimitive {
        return DocuFilePrimitiveMother.from({});
    }

    public static from(data: DeepPartial<DocuFilePrimitive>): DocuFilePrimitive {
        const id = data.id ?? faker.string.uuid();
        const name = data.name ?? faker.lorem.words({ min: 2, max: 4 });
        const parentFolderId = data.parentFolderId === undefined
            ? faker.helpers.arrayElement([null, faker.string.uuid()])
            : data.parentFolderId
        const mimeType = data.mimeType ?? faker.helpers.arrayElement(DocuMimeType.ValidValues);
        const sizeInBytes = data.sizeInBytes ?? faker.number.int({ min: 1, max: 1000000 })
        const extension = data.extension === undefined
            ? faker.helpers.arrayElement([null, new DocuMimeType(mimeType).extension])
            : data.extension
        const url = data.url ?? faker.internet.url();
        const isDeleted = data.isDeleted === undefined
            ? faker.datatype.boolean()
            : data.isDeleted
        const sharedToken = data.sharedToken === undefined
            ? faker.helpers.arrayElement([null, faker.string.uuid()])
            : data.sharedToken
        const createdAt = data.createdAt ?? faker.date.past().getTime();
        const updatedAt = data.updatedAt ?? faker.date.recent().getTime();

        return {
            id,
            name,
            parentFolderId,
            mimeType,
            sizeInBytes,
            extension,
            url,
            isDeleted,
            sharedToken,            
            createdAt,
            updatedAt,
        }
    }

    public static generate(amount = getRandomNumber(1, 5)): DocuFilePrimitive[] {
        return Array.from(Array(amount)).map(DocuFilePrimitiveMother.random);
    }

    public static generateWith(data: DeepPartial<DocuFilePrimitive>, amount = getRandomNumber(1, 5)): DocuFilePrimitive[] {
        return Array.from(Array(amount)).map(() => DocuFilePrimitiveMother.from(data));
    }
}