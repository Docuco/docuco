import { deepEqual, when } from "ts-mockito";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { DocuFilePrimitiveMother } from "../Primitives/DocuFilePrimitiveMother";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFileDeleterPermanently } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileDeleterPermanently";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { DocuFileDeletedPermanently } from "../../../../../../app/_core/Documents/Domain/Events/DocuFileDeletedPermanently";

describe('DocuFileDeleterPermanently', () => {

    const docuFileRepositoryMock = new InterfaceMock<DocuFileRepository>();
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        docuFileRepositoryMock.reset();
        eventBusMock.reset();
    });

    test(`
        GIVEN a docuFile
        WHEN call to docuFile deleter permanently
        THEN call to docuFile deleter permanently
        AND send "DocuFileDeletedPermanently" event
    `, async () => {
        const docuFile = DocuFilePrimitiveMother.random()

        when(docuFileRepositoryMock.mockito.delete(deepEqual(DocuFile.fromPrimitives(docuFile)))).thenResolve();

        const docuFileDeleterPermanently = new DocuFileDeleterPermanently(
            docuFileRepositoryMock.instance(),
            eventBusMock.instance()
        );
        await docuFileDeleterPermanently.run(DocuFile.fromPrimitives(docuFile));

        docuFileRepositoryMock.expectMethodToHaveBeenCalledTimes('delete', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(DocuFileDeletedPermanently, {
            id: docuFile.id,
        })
    });
})