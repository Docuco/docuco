import { ContentFilePrimitive } from "../../../../../../app/_core/Documents/Domain/Primitives/ContentFilePrimitive";
import { DocuMimeType, DocuMimeTypeType } from "../../../../../../app/_core/Documents/Domain/VOs/DocuMimeType";
import { getRandomNumber } from "../../../Shared/Domain/GetRandomNumber";
import { DeepPartial } from "../../../Shared/Infrastructure/DeepPartial";
import { faker } from '@faker-js/faker';

export class ContentFilePrimitiveMother {

    public static random(): ContentFilePrimitive {
        return ContentFilePrimitiveMother.from({});
    }

    public static from(data: DeepPartial<ContentFilePrimitive>): ContentFilePrimitive {
        const id = data.id ?? faker.string.uuid();
        const name = data.name ?? faker.lorem.words({ min: 2, max: 4 });
        const mimeType = data.mimeType ?? faker.helpers.arrayElement(DocuMimeType.ValidValues);
        const sizeInBytes = data.sizeInBytes === undefined
            ? faker.number.int({ min: 1, max: 1000000 })
            : data.sizeInBytes
        const extension = new DocuMimeType(mimeType).extension
        const content = (data.content as Blob) ?? new Blob([faker.lorem.paragraphs(getRandomNumber(1, 5))]);

        return {
            id,
            name,
            mimeType,
            sizeInBytes,
            extension,
            content,
        }
    }

    public static fromFile(file: File): ContentFilePrimitive {
        const fileParts = file.name.split('.');
        const fileName = fileParts[0] ?? '';
        const fileExtension = fileParts[1] ?? null;

        return ContentFilePrimitiveMother.from({
            ...file,
            name: fileName,
            mimeType: file.type as DocuMimeTypeType,
            sizeInBytes: file.size,
            extension: fileExtension
        })
    }
}