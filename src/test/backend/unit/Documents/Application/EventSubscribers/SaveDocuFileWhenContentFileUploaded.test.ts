import { deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { DocuFileSaver } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileSaver";
import { ContentFileUploadedMother } from "../../Domain/Events/ContentFileUploadedMother";
import { SaveDocuFileWhenContentFileUploaded } from "../../../../../../app/_core/Documents/Application/EventSubscriber/SaveDocuFileWhenContentFileUploaded";

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