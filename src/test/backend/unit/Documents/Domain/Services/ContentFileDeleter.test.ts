import { deepEqual, when } from "ts-mockito";
import { ContentFileDeleter } from "../../../../../../app/_core/Documents/Domain/Services/ContentFileDeleter";
import { DocuFilePrimitiveMother } from "../Primitives/DocuFilePrimitiveMother";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { ContentFileStore } from "../../../../../../app/_core/Documents/Domain/Repositories/ContentFileStore";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { ContentFileDeleted } from "../../../../../../app/_core/Documents/Domain/Events/ContentFileDeleted";

describe('ContentFileDeleter', () => {

    const contentFileStoreMock = new InterfaceMock<ContentFileStore>();
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        contentFileStoreMock.reset();
        eventBusMock.reset();
    });

    test(`
        GIVEN a existing docuFile
        WHEN call to content file deleter
        THEN delete the content file
        AND send "ContentFileDeleted" event
    `, async () => {
        const docuFile = DocuFilePrimitiveMother.random();

        when(contentFileStoreMock.mockito.delete(deepEqual(DocuFile.fromPrimitives(docuFile)))).thenResolve();

        const contentFileDeleter = new ContentFileDeleter(
            contentFileStoreMock.instance(),
            eventBusMock.instance()
        );
        await contentFileDeleter.run(DocuFile.fromPrimitives(docuFile));

        contentFileStoreMock.expectMethodToHaveBeenCalledTimes('delete', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(ContentFileDeleted, {
            id: docuFile.id,
        })
    });
})