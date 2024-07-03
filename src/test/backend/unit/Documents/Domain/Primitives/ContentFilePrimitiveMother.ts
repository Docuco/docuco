import { ContentFilePrimitive } from "../../../../../../app/_core/Documents/Domain/Primitives/ContentFilePrimitive";
import { DocuMimeType } from "../../../../../../app/_core/Documents/Domain/VOs/DocuMimeType";
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
        const sizeInBytes = data.sizeInBytes ?? faker.number.int({ min: 1, max: 1000000 })
        const extension = data.extension === undefined
            ? faker.helpers.arrayElement([null, new DocuMimeType(mimeType).extension])
            : data.extension
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
}