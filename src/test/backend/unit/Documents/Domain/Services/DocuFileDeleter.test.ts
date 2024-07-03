import { anything, when } from "ts-mockito";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { DocuFileDeleter } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileDeleter";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { DocuFilePrimitiveMother } from "../Primitives/DocuFilePrimitiveMother";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFileDeleted } from "../../../../../../app/_core/Documents/Domain/Events/DocuFileDeleted";
import { SharedToken } from "../../../../../../app/_core/Shared/Domain/VOs/ShareToken";
import { DocuFileHasStoppedBeingShared } from "../../../../../../app/_core/Documents/Domain/Events/DocuFileHasStoppedBeingShared";

describe('DocuFileDeleter', () => {

    const docuFileRepositoryMock = new InterfaceMock<DocuFileRepository>();
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        docuFileRepositoryMock.reset();
        eventBusMock.reset();
    });

    test(`
        GIVEN a existing non-deleted docuFile 
        AND with shared token
        WHEN call to docuFile deleter
        THEN save the docuFile as deleted
        AND without shared token
        AND send "DocuFileDeleted" event
        AND send "DocuFileHasStoppedBeingShared" event
    `, async () => {
        const docuFile = DocuFilePrimitiveMother.from({
            isDeleted: false,
            sharedToken: SharedToken.new().value,
        });

        when(docuFileRepositoryMock.mockito.save(anything())).thenResolve();

        const docuFileDeleter = new DocuFileDeleter(
            docuFileRepositoryMock.instance(),
            eventBusMock.instance()
        );
        await docuFileDeleter.run(DocuFile.fromPrimitives(docuFile));

        docuFileRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(DocuFileDeleted, {
            id: docuFile.id,
            isDeleted: true,
        })
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(DocuFileHasStoppedBeingShared, {
            id: docuFile.id,
            sharedToken: null,
        })
    });

    test(`
        GIVEN a existing deleted docuFile 
        WHEN call to docuFile deleter
        THEN save the docuFile with the same state 
        AND not send any event
    `, async () => {
        const docuFile = DocuFilePrimitiveMother.from({
            isDeleted: true,
        });

        when(docuFileRepositoryMock.mockito.save(anything())).thenResolve();

        const docuFileDeleter = new DocuFileDeleter(
            docuFileRepositoryMock.instance(),
            eventBusMock.instance()
        );
        await docuFileDeleter.run(DocuFile.fromPrimitives(docuFile));

        docuFileRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectZeroEventsPublished();
    });

    test(`
        GIVEN a existing non-deleted docuFile 
        AND without shared token
        WHEN call to docuFile deleter
        THEN save the docuFile as deleted
        AND without shared token
        AND send "DocuFileDeleted" event
        AND not send "DocuFileHasStoppedBeingShared" event
    `, async () => {
        const docuFile = DocuFilePrimitiveMother.from({
            isDeleted: false,
            sharedToken: null,
        });

        when(docuFileRepositoryMock.mockito.save(anything())).thenResolve();

        const docuFileDeleter = new DocuFileDeleter(
            docuFileRepositoryMock.instance(),
            eventBusMock.instance()
        );
        await docuFileDeleter.run(DocuFile.fromPrimitives(docuFile));

        docuFileRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(DocuFileDeleted, {
            id: docuFile.id,
            isDeleted: true,
        })
        eventBusMock.expectEventNotPublished(DocuFileHasStoppedBeingShared);
    });
})