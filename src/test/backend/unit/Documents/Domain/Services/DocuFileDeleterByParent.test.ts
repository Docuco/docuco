import { deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DocuFileDeleter } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileDeleter";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { DocuFilePrimitiveMother } from "../Primitives/DocuFilePrimitiveMother";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFileDeleterByParent } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileDeleterByParent";
import { FolderPrimitiveMother } from "../../../Folders/Domain/Primitives/FolderPrimitiveMother";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";

describe('DocuFileDeleterByParent', () => {

    const docuFileRepositoryMock = new InterfaceMock<DocuFileRepository>();
    const docuFileDeleterMock = mock(DocuFileDeleter);

    afterEach(() => {
        docuFileRepositoryMock.reset();
        reset(docuFileDeleterMock);
    });

    test(`
        GIVEN a folder with docuFiles
        WHEN call to docuFile deleter by parent
        THEN call to docuFile deleter for each docuFile
    `, async () => {
        const folder = FolderPrimitiveMother.random();
        const docuFiles = DocuFilePrimitiveMother.generateWith({
            parentFolderId: folder.id
        }, 3)

        when(docuFileRepositoryMock.mockito.findByParent(deepEqual(Folder.fromPrimitives(folder))))
            .thenResolve(docuFiles.map(DocuFile.fromPrimitives));

        const docuFileDeleterByParent = new DocuFileDeleterByParent(
            docuFileRepositoryMock.instance(),
            instance(docuFileDeleterMock)
        );
        await docuFileDeleterByParent.run(Folder.fromPrimitives(folder));

        docuFiles.forEach(docuFile => {
            verify(docuFileDeleterMock.run(deepEqual(DocuFile.fromPrimitives(docuFile)))).once();
        })
    });
})