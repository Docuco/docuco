import { anything, deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { DocuFilePrimitiveMother } from "../Primitives/DocuFilePrimitiveMother";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFileDeleterPermanently } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileDeleterPermanently";
import { DocuFileDeleterPermanentlyByParent } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileDeleterPermanentlyByParent";
import { FolderPrimitiveMother } from "../../../Folders/Domain/Primitives/FolderPrimitiveMother";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";

describe('DocuFileDeleterPermanentlyByParent', () => {

    const docuFileRepositoryMock = new InterfaceMock<DocuFileRepository>();
    const docuFileDeleterPermanentlyMock = mock(DocuFileDeleterPermanently);

    afterEach(() => {
        docuFileRepositoryMock.reset();
        reset(docuFileDeleterPermanentlyMock);
    });

    test(`
        GIVEN a folder with docuFiles
        WHEN call to docuFile deleter permanently by parent
        THEN call to docuFile deleter permanently for each docuFile
    `, async () => {
        const folder = FolderPrimitiveMother.random();
        const docuFiles = DocuFilePrimitiveMother.generateWith({
            parentFolderId: folder.id
        }, 3)

        when(docuFileRepositoryMock.mockito.findByParent(deepEqual(Folder.fromPrimitives(folder))))
            .thenResolve(docuFiles.map(DocuFile.fromPrimitives));
        when(docuFileDeleterPermanentlyMock.run(anything())).thenResolve();

        const docuFileDeleterPermanentlyByParent = new DocuFileDeleterPermanentlyByParent(
            docuFileRepositoryMock.instance(),
            instance(docuFileDeleterPermanentlyMock)
        );
        await docuFileDeleterPermanentlyByParent.run(Folder.fromPrimitives(folder));

        docuFiles.forEach(docuFile => {
            verify(docuFileDeleterPermanentlyMock.run(deepEqual(DocuFile.fromPrimitives(docuFile)))).once();
        })
    });
})