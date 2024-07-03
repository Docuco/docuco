import { deepEqual, instance, mock, reset, when } from "ts-mockito";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitiveMother } from "../../Domain/Primitives/DocuFilePrimitiveMother";
import { GetDocuFile } from "../../../../../../app/_core/Documents/Application/Queries/GetDocuFile";
import { DocuFileFinder } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileFinder";

describe('GetDocuFile', () => {

    const docuFileFinderMock = mock(DocuFileFinder);

    afterEach(() => {
        reset(docuFileFinderMock);
    });
   
    test(`
        GIVEN an existing docuFile
        WHEN I get the docuFile
        THEN return the docuFile
    `, async () => {
        const docuFileId = Id.new().value;
        const docuFilePrimitive = DocuFilePrimitiveMother.from({
            id: docuFileId,
        });

        when(docuFileFinderMock.run(deepEqual(new Id(docuFileId)))).thenResolve(DocuFile.fromPrimitives(docuFilePrimitive));

        const getDocuFile = new GetDocuFile(
            instance(docuFileFinderMock),
        );
        const docuFile = await getDocuFile.run({ id: docuFileId });

        expect(docuFile).toEqual(DocuFile.fromPrimitives(docuFilePrimitive));
    });
})