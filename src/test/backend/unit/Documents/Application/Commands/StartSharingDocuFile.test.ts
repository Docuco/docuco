import { deepEqual, instance, mock, reset, when } from "ts-mockito";
import { DocuFileFinder } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileFinder";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitiveMother } from "../../Domain/Mothers/DocuFilePrimitiveMother";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { StartSharingDocuFile } from "../../../../../../app/_core/Documents/Application/Commands/StartSharingDocuFile";
import { DocuFileHasStartedToBeShared } from "../../../../../../app/_core/Documents/Domain/Events/DocuFileHasStartedToBeShared";

describe('StartSharingDocuFile', () => {

    const docuFileFinderMock = mock(DocuFileFinder);
    const docuFileRepositoryMock = new InterfaceMock<DocuFileRepository>();
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        reset(docuFileFinderMock);
        docuFileRepositoryMock.reset();
        eventBusMock.reset();
    });
   
    test(`
        GIVEN a not shared docuFile
        WHEN I start sharing the docuFile
        THEN save the docuFile with a shared token
        AND send "DocuFileHasStartedToBeShared" event
    `, async () => {
        const docuFilePrimitive = DocuFilePrimitiveMother.from({
            sharedToken: null,
        });

        when(docuFileFinderMock.run(deepEqual(new Id(docuFilePrimitive.id)))).thenResolve(DocuFile.fromPrimitives(docuFilePrimitive));

        const startSharingDocuFile = new StartSharingDocuFile(
            instance(docuFileFinderMock),
            docuFileRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await startSharingDocuFile.run({
            id: docuFilePrimitive.id,
        });

        docuFileRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(DocuFileHasStartedToBeShared, {
            id: docuFilePrimitive.id,
            sharedToken: expect.any(String),
        });
    });

    test(`
        GIVEN a shared docuFile
        WHEN I start sharing the docuFile
        THEN save the docuFile with a the same shared token
        AND not send any event
    `, async () => {
        const docuFilePrimitive = DocuFilePrimitiveMother.from({
            sharedToken: Id.new().value,
        });

        when(docuFileFinderMock.run(deepEqual(new Id(docuFilePrimitive.id)))).thenResolve(DocuFile.fromPrimitives(docuFilePrimitive));

        const startSharingDocuFile = new StartSharingDocuFile(
            instance(docuFileFinderMock),
            docuFileRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await startSharingDocuFile.run({
            id: docuFilePrimitive.id,
        });

        docuFileRepositoryMock.expectMethodToHaveBeenCalledWith('save', DocuFile.fromPrimitives(docuFilePrimitive));
        eventBusMock.expectZeroEventsPublished();
    });
})