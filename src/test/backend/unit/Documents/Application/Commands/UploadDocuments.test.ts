import { anything, verify, instance, mock, reset, when } from "ts-mockito";
import { DocuFileFinder } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileFinder";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitiveMother } from "../../Domain/Primitives/DocuFilePrimitiveMother";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { DocuFileHasStoppedBeingShared } from "../../../../../../app/_core/Documents/Domain/Events/DocuFileHasStoppedBeingShared";
import { UploadDocuments } from "../../../../../../app/_core/Documents/Application/Commands/UploadDocuments";
import { ContentFileUploader } from "../../../../../../app/_core/Documents/Domain/Services/ContentFileUploader";

describe('UploadDocuments', () => {

    const contentFileUploaderMock = mock(ContentFileUploader);

    afterEach(() => {
        reset(contentFileUploaderMock);
    });
   
    test(`
        GIVEN a list of files and a parent folder
        WHEN I upload the documents
        THEN call to content file uploader for each file
    `, async () => {
        const files = [
            new File([""], "filename_1", { type: 'application/pdf' }),
            new File([""], "filename_2", { type: 'application/pdf' }),
        ]
        const parentFolderId = Id.new().value;

        when(contentFileUploaderMock.run(anything())).thenResolve();

        const uploadDocuments = new UploadDocuments(
            instance(contentFileUploaderMock),
        );
        await uploadDocuments.run({
            files,
            parentFolderId,
        });

        verify(contentFileUploaderMock.run(anything())).twice();
    });
})