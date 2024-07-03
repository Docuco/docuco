import { deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitiveMother } from "../../Domain/Primitives/DocuFilePrimitiveMother";
import { ContentFileDeleter } from "../../../../../../app/_core/Documents/Domain/Services/ContentFileDeleter";
import { DeleteContentFileWhenDocuFileDeletedPermanently } from "../../../../../../app/_core/Documents/Application/EventSubscriber/DeleteContentFileWhenDocuFileDeletedPermanently";
import { DocuFileDeletedPermanentlyMother } from "../../Domain/Events/DocuFileDeletedPermanentlyMother";

describe('DeleteContentFileWhenDocuFileDeletedPermanently', () => {

    const contentFileDeleterMock = mock(ContentFileDeleter);

    afterEach(() => {
        reset(contentFileDeleterMock);
    });

    test(`
        WHEN event "DocuFileDeletedPermanently" is triggered
        THEN call to content file deleter with the docuFile
    `, async () => {
        const docuFilePrimitive = DocuFilePrimitiveMother.random();
        const docuFileDeletedPermanently = DocuFileDeletedPermanentlyMother.from(docuFilePrimitive);

        when(contentFileDeleterMock.run(deepEqual(DocuFile.fromPrimitives(docuFilePrimitive)))).thenResolve();

        const deleteContentFileWhenDocuFileDeletedPermanently = new DeleteContentFileWhenDocuFileDeletedPermanently(
            instance(contentFileDeleterMock),
        );
        await deleteContentFileWhenDocuFileDeletedPermanently.on(docuFileDeletedPermanently);

        verify(contentFileDeleterMock.run(deepEqual(DocuFile.fromPrimitives(docuFilePrimitive)))).once();
    });
})