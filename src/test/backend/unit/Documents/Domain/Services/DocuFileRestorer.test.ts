import { deepEqual, when } from "ts-mockito";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { DocuFilePrimitiveMother } from "../Primitives/DocuFilePrimitiveMother";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFileRestorer } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileRestorer";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { DocuFileRestored } from "../../../../../../app/_core/Documents/Domain/Events/DocuFileRestored";

describe('DocuFileRestorer', () => {

    const docuFileRepositoryMock = new InterfaceMock<DocuFileRepository>();
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        docuFileRepositoryMock.reset();
        eventBusMock.reset();
    });

    test(`
        GIVEN a deleted docuFile
        WHEN call to docuFile restorer with the docuFile
        THEN save the docuFile
        AND send "DocuFileRestored" event with isDeleted = false
    `, async () => {
        const docuFile = DocuFilePrimitiveMother.from({
            isDeleted: true
        })

        when(docuFileRepositoryMock.mockito.save(deepEqual(DocuFile.fromPrimitives(docuFile)))).thenResolve();

        const docuFileRestorer = new DocuFileRestorer(
            docuFileRepositoryMock.instance(),
            eventBusMock.instance()
        );
        await docuFileRestorer.run(DocuFile.fromPrimitives(docuFile));

        docuFileRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(DocuFileRestored, {
            id: docuFile.id,
            isDeleted: false
        })
    });

    test(`
        GIVEN a non deleted docuFile
        WHEN call to docuFile restorer with the docuFile
        THEN save the docuFile
        AND do not send any event
    `, async () => {
        const docuFile = DocuFilePrimitiveMother.from({
            isDeleted: false
        })

        when(docuFileRepositoryMock.mockito.save(deepEqual(DocuFile.fromPrimitives(docuFile)))).thenResolve();

        const docuFileRestorer = new DocuFileRestorer(
            docuFileRepositoryMock.instance(),
            eventBusMock.instance()
        );
        await docuFileRestorer.run(DocuFile.fromPrimitives(docuFile));

        docuFileRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectZeroEventsPublished();
    });
})