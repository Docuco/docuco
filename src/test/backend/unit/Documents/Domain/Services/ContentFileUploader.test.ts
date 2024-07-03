import { anything, when } from "ts-mockito";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { ContentFileStore } from "../../../../../../app/_core/Documents/Domain/Repositories/ContentFileStore";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { ContentFileUploader } from "../../../../../../app/_core/Documents/Domain/Services/ContentFileUploader";
import { ContentFileUploaded } from "../../../../../../app/_core/Documents/Domain/Events/ContentFileUploaded";
import { ContentFilePrimitiveMother } from "../Primitives/ContentFilePrimitiveMother";
import { ContentFile } from "../../../../../../app/_core/Documents/Domain/Entities/ContentFile";

describe('ContentFileUploader', () => {

    const contentFileStoreMock = new InterfaceMock<ContentFileStore>();
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        contentFileStoreMock.reset();
        eventBusMock.reset();
    });

    test(`
        GIVEN a file
        AND a parent folder
        WHEN call to content file uploader
        THEN upload the content file
        AND send "ContentFileUploaded" event
    `, async () => {
        const file = new File([], 'filename.pdf', { type: 'application/pdf' });
        const parentFolderId = Id.new().value;
        const contentFilePrimitive = ContentFilePrimitiveMother.fromFile(file)

        when(contentFileStoreMock.mockito.upload(anything())).thenResolve({
            url: 'https://example.com/file.pdf',
            file: ContentFile.fromPrimitives(contentFilePrimitive),
        });

        const contentFileUploader = new ContentFileUploader(
            contentFileStoreMock.instance(),
            eventBusMock.instance()
        );
        await contentFileUploader.run({
            file,
            parentFolderId,
        });

        contentFileStoreMock.expectMethodToHaveBeenCalledTimes('upload', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(ContentFileUploaded, {
            contentFile: {
                id: expect.any(String),
                name: 'filename',
                mimeType: 'application/pdf',
                sizeInBytes: 0,
                extension: 'pdf',
            },
            url: 'https://example.com/file.pdf',
            parentFolderId,
        })
    });

    test(`
        GIVEN a file without extension
        AND a parent folder
        WHEN call to content file uploader
        THEN upload the content file with null extension
        AND send "ContentFileUploaded" event
    `, async () => {
        const file = new File([], 'filename', { type: 'application/pdf' });
        const parentFolderId = Id.new().value;
        const contentFilePrimitive = ContentFilePrimitiveMother.fromFile(file)

        when(contentFileStoreMock.mockito.upload(anything())).thenResolve({
            url: 'https://example.com/file.pdf',
            file: ContentFile.fromPrimitives(contentFilePrimitive),
        });

        const contentFileUploader = new ContentFileUploader(
            contentFileStoreMock.instance(),
            eventBusMock.instance()
        );
        await contentFileUploader.run({
            file,
            parentFolderId,
        });

        contentFileStoreMock.expectMethodToHaveBeenCalledTimes('upload', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(ContentFileUploaded, {
            contentFile: {
                id: expect.any(String),
                name: 'filename',
                mimeType: 'application/pdf',
                sizeInBytes: 0,
                extension: null,
            },
            url: 'https://example.com/file.pdf',
            parentFolderId,
        })
    });
})