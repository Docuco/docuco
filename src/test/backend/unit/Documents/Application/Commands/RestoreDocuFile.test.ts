import { anything, deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { DocuFileFinder } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileFinder";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitiveMother } from "../../Domain/Primitives/DocuFilePrimitiveMother";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { DocuFileUnlinkedFromParent } from "../../../../../../app/_core/Documents/Domain/Events/DocuFileUnlinkedFromParent";
import { RestoreDocuFile } from "../../../../../../app/_core/Documents/Application/Commands/RestoreDocuFile";
import { DocuFileRestorer } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileRestorer";

describe('RestoreDocuFile', () => {

    const docuFileFinderMock = mock(DocuFileFinder);
    const docuFileRestorerMock = mock(DocuFileRestorer);
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        reset(docuFileFinderMock);
        reset(docuFileRestorerMock);
        eventBusMock.reset();
    });
   
    test(`
        GIVEN a delete docuFile with a parent
        WHEN I restore the docuFile
        THEN call to restorer with the docuFile
        AND send "DocuFileUnlinkedFromParent" event
    `, async () => {
        const docuFilePrimitive = DocuFilePrimitiveMother.from({
            parentFolderId: Id.new().value,
        });

        when(docuFileFinderMock.run(deepEqual(new Id(docuFilePrimitive.id)))).thenResolve(DocuFile.fromPrimitives(docuFilePrimitive));

        const restoreDocuFile = new RestoreDocuFile(
            instance(docuFileFinderMock),
            instance(docuFileRestorerMock),
            eventBusMock.instance(),
        );
        await restoreDocuFile.run({
            id: docuFilePrimitive.id,
        });

        verify(docuFileRestorerMock.run(anything())).once();
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(DocuFileUnlinkedFromParent, {
            id: docuFilePrimitive.id,
            parentFolderId: null,
        });
    });

    test(`
        GIVEN a delete docuFile without parent
        WHEN I restore the docuFile
        THEN call to restorer with the docuFile
        AND not send any event
    `, async () => {
        const docuFilePrimitive = DocuFilePrimitiveMother.from({
            parentFolderId: null,
        });

        when(docuFileFinderMock.run(deepEqual(new Id(docuFilePrimitive.id)))).thenResolve(DocuFile.fromPrimitives(docuFilePrimitive));

        const restoreDocuFile = new RestoreDocuFile(
            instance(docuFileFinderMock),
            instance(docuFileRestorerMock),
            eventBusMock.instance(),
        );
        await restoreDocuFile.run({
            id: docuFilePrimitive.id,
        });

        verify(docuFileRestorerMock.run(anything())).once();
        eventBusMock.expectZeroEventsPublished();
    });
})