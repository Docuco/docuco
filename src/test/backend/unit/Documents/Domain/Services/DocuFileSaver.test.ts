import { anything, when } from "ts-mockito";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { DocuFileSaver } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileSaver";
import { ContentFilePrimitiveMother } from "../Primitives/ContentFilePrimitiveMother";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { DocuFileCreated } from "../../../../../../app/_core/Documents/Domain/Events/DocuFileCreated";

describe('DocuFileSaver', () => {

    const docuFileRepositoryMock = new InterfaceMock<DocuFileRepository>();
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        docuFileRepositoryMock.reset();
        eventBusMock.reset();
    });

    test(`
        GIVEN a content file, a url and a parent folder id
        WHEN call to docuFile saver
        THEN save the docuFile
        AND send "DocuFileCreated" event
    `, async () => {
        const url = 'https://example.com';
        const parentFolderId = Id.new().value;
        const content = ContentFilePrimitiveMother.random();

        when(docuFileRepositoryMock.mockito.save(anything())).thenResolve();

        const docuFileSaver = new DocuFileSaver(
            docuFileRepositoryMock.instance(),
            eventBusMock.instance()
        );
        await docuFileSaver.run({
            contentFile: content,
            url,
            parentFolderId,
        });

        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(DocuFileCreated, {
            id: expect.any(String),
            name: content.name,
            parentFolderId,
            mimeType: content.mimeType,
            sizeInBytes: content.sizeInBytes,
            extension: content.extension,
            url,
            isDeleted: false,
            sharedToken: null,
            createdAt: expect.any(Number),
            updatedAt: expect.any(Number),
        })
    });

})