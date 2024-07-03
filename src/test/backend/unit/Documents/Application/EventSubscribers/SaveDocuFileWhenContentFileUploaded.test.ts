import { deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { FolderFinder } from "../../../../../../app/_core/Folders/Domain/Services/FolderFinder";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";
import { FolderPrimitiveMother } from "../../../Folders/Domain/Primitives/FolderPrimitiveMother";
import { RestoreDocuFileWhenParentIsRestored } from "../../../../../../app/_core/Documents/Application/EventSubscriber/RestoreDocuFileWhenParentIsRestored";
import { DocuFileRestorerByParent } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileRestorerByParent";
import { FolderRestoredMother } from "../../../Folders/Domain/Events/FolderRestoredMother";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { SaveDocuFileWhenContentFileUploaded } from "../../../../../../app/_core/Documents/Application/EventSubscriber/SaveDocuFileWhenContentFileUploaded";
import { DocuFileSaver } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileSaver";
import { ContentFileUploadedMother } from "../../Domain/Events/ContentFileUploadedMother";

describe('SaveDocuFileWhenContentFileUploaded', () => {

    const docuFileSaverMock = mock(DocuFileSaver);

    afterEach(() => {
        reset(docuFileSaverMock);
    });

    test(`
        WHEN event "ContentFileUploaded" is triggered
        THEN call to docuFile saver with the content file attributes
    `, async () => {
        const contentUploadedData = ContentFileUploadedMother.random();

        when(docuFileSaverMock.run(deepEqual(contentUploadedData.attributes))).thenResolve();

        const saveDocuFileWhenContentFileUploaded = new SaveDocuFileWhenContentFileUploaded(
            instance(docuFileSaverMock),
        );
        await saveDocuFileWhenContentFileUploaded.on(contentUploadedData);

        verify(docuFileSaverMock.run(deepEqual(contentUploadedData.attributes))).once();
    });
})