import { anything, deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { DocuFileFinder } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileFinder";
import { DocuFileDeleter } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileDeleter";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitiveMother } from "../../Domain/Primitives/DocuFilePrimitiveMother";
import { DeleteDocuFile } from "../../../../../../app/_core/Documents/Application/Commands/DeleteDocuFile";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { DocuFileUnlinkedFromParent } from "../../../../../../app/_core/Documents/Domain/Events/DocuFileUnlinkedFromParent";

describe('DeleteDocuFile', () => {

    const docuFileFinderMock = mock(DocuFileFinder);
    const docuFileDeleterMock = mock(DocuFileDeleter);
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        reset(docuFileFinderMock);
        reset(docuFileDeleterMock);
        eventBusMock.reset();
    });
   
    test(`
        GIVEN an existing docuFile with a parent
        WHEN I delete the docuFile
        THEN call to deleter with the docuFile
        AND send "DocuFileUnlinkedFromParent" event
    `, async () => {
        const docuFilePrimitive = DocuFilePrimitiveMother.from({
            parentFolderId: Id.new().value,
        });

        when(docuFileFinderMock.run(deepEqual(new Id(docuFilePrimitive.id)))).thenResolve(DocuFile.fromPrimitives(docuFilePrimitive));

        const deleteDocuFile = new DeleteDocuFile(
            instance(docuFileFinderMock),
            instance(docuFileDeleterMock),
            eventBusMock.instance(),
        );
        await deleteDocuFile.run({
            id: docuFilePrimitive.id,
        });

        verify(docuFileDeleterMock.run(anything())).once();
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(DocuFileUnlinkedFromParent, {
            id: docuFilePrimitive.id,
            parentFolderId: null,
        });
    });

    test(`
        GIVEN an existing docuFile without parent
        WHEN I delete the docuFile
        THEN call to deleter with the docuFile
        AND not send any event
    `, async () => {
        const docuFilePrimitive = DocuFilePrimitiveMother.from({
            parentFolderId: null,
        });

        when(docuFileFinderMock.run(deepEqual(new Id(docuFilePrimitive.id)))).thenResolve(DocuFile.fromPrimitives(docuFilePrimitive));

        const deleteDocuFile = new DeleteDocuFile(
            instance(docuFileFinderMock),
            instance(docuFileDeleterMock),
            eventBusMock.instance(),
        );
        await deleteDocuFile.run({
            id: docuFilePrimitive.id,
        });

        verify(docuFileDeleterMock.run(anything())).once();
        eventBusMock.expectZeroEventsPublished();
    });
})