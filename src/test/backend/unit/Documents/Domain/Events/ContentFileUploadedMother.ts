import { DeepPartial } from "../../../Shared/Infrastructure/DeepPartial";
import { faker } from '@faker-js/faker';
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { ContentFileUploaded } from "../../../../../../app/_core/Documents/Domain/Events/ContentFileUploaded";
import { ContentFilePrimitive } from "../../../../../../app/_core/Documents/Domain/Primitives/ContentFilePrimitive";
import { ContentFilePrimitiveMother } from "../Primitives/ContentFilePrimitiveMother";

export class ContentFileUploadedMother {

    public static random(): ContentFileUploaded {
        return ContentFileUploadedMother.from({});
    }

    public static from(data: DeepPartial<{
        contentFile: ContentFilePrimitive,
        url: string,
        parentFolderId: string | null,
    }>): ContentFileUploaded {
        const contentFileData = ContentFilePrimitiveMother.from({ ...data.contentFile });
        const url = data.url || faker.internet.url();
        const parentFolderId = data.parentFolderId === undefined
            ? faker.helpers.arrayElement([null, faker.string.uuid()])
            : data.parentFolderId;

        return new ContentFileUploaded({
            attributes: {
                contentFile: contentFileData,
                url,
                parentFolderId,
            },
            entityId: contentFileData.id,
            eventId: Id.new().value,
            occurredOn: faker.date.past(),
        });
    }
}