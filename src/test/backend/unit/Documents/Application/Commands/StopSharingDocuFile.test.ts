import { deepEqual, instance, mock, reset, when } from "ts-mockito";
import { DocuFileFinder } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileFinder";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitiveMother } from "../../Domain/Mothers/DocuFilePrimitiveMother";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { DocuFileHasStoppedBeingShared } from "../../../../../../app/_core/Documents/Domain/Events/DocuFileHasStoppedBeingShared";
import { StopSharingDocuFile } from "../../../../../../app/_core/Documents/Application/Commands/StopSharingDocuFile";

describe('StopSharingDocuFile', () => {

    const docuFileFinderMock = mock(DocuFileFinder);
    const docuFileRepositoryMock = new InterfaceMock<DocuFileRepository>();
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        reset(docuFileFinderMock);
        docuFileRepositoryMock.reset();
        eventBusMock.reset();
    });
   
    test(`
        GIVEN a shared docuFile
        WHEN I stop sharing the docuFile
        THEN save the docuFile with a null shared token
        AND send "DocuFileHasStartedToBeShared" event
    `, async () => {
        const docuFilePrimitive = DocuFilePrimitiveMother.from({
            sharedToken: Id.new().value,
        });

        when(docuFileFinderMock.run(deepEqual(new Id(docuFilePrimitive.id)))).thenResolve(DocuFile.fromPrimitives(docuFilePrimitive));

        const stopSharingDocuFile = new StopSharingDocuFile(
            instance(docuFileFinderMock),
            docuFileRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await stopSharingDocuFile.run({
            id: docuFilePrimitive.id,
        });

        docuFileRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(DocuFileHasStoppedBeingShared, {
            id: docuFilePrimitive.id,
            sharedToken: null,
        });
    });

    test(`
        GIVEN a not shared docuFile
        WHEN I stop sharing the docuFile
        THEN save the same docuFile
        AND not send any event
    `, async () => {
        const docuFilePrimitive = DocuFilePrimitiveMother.from({
            sharedToken: null,
        });

        when(docuFileFinderMock.run(deepEqual(new Id(docuFilePrimitive.id)))).thenResolve(DocuFile.fromPrimitives(docuFilePrimitive));

        const stopSharingDocuFile = new StopSharingDocuFile(
            instance(docuFileFinderMock),
            docuFileRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await stopSharingDocuFile.run({
            id: docuFilePrimitive.id,
        });

        docuFileRepositoryMock.expectMethodToHaveBeenCalledWith('save', DocuFile.fromPrimitives(docuFilePrimitive));
        eventBusMock.expectZeroEventsPublished();
    });
})