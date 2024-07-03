import { deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { DocuFileFinder } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileFinder";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitiveMother } from "../../Domain/Primitives/DocuFilePrimitiveMother";
import { DeletePermanentlyDocuFile } from "../../../../../../app/_core/Documents/Application/Commands/DeletePermanentlyDocuFile";
import { DocuFileDeleterPermanently } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileDeleterPermanently";

describe('DeletePermanentlyDocuFile', () => {

    const docuFileFinderMock = mock(DocuFileFinder);
    const docuFileDeleterPermanentlyMock = mock(DocuFileDeleterPermanently);

    afterEach(() => {
        reset(docuFileFinderMock);
        reset(docuFileDeleterPermanentlyMock);
    });
   
    test(`
        GIVEN an existing docuFile
        WHEN I delete permanently the docuFile
        THEN call to deleter pemanently with the docuFile
    `, async () => {
        const docuFilePrimitive = DocuFilePrimitiveMother.from({
            parentFolderId: Id.new().value,
        });

        when(docuFileFinderMock.run(deepEqual(new Id(docuFilePrimitive.id)))).thenResolve(DocuFile.fromPrimitives(docuFilePrimitive));

        const deletePermanentlyDocuFile = new DeletePermanentlyDocuFile(
            instance(docuFileFinderMock),
            instance(docuFileDeleterPermanentlyMock),
        );
        await deletePermanentlyDocuFile.run({
            id: docuFilePrimitive.id,
        });

        verify(docuFileDeleterPermanentlyMock.run(
            deepEqual(DocuFile.fromPrimitives(docuFilePrimitive))
        )).once();
    });
})