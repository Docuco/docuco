import { anything, deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { DocuFilePrimitiveMother } from "../Primitives/DocuFilePrimitiveMother";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFileRestorer } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileRestorer";
import { DocuFileRestorerByParent } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileRestorerByParent";
import { FolderPrimitiveMother } from "../../../Folders/Domain/Primitives/FolderPrimitiveMother";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";

describe('DocuFileRestorerByParent', () => {

    const docuFileRepositoryMock = new InterfaceMock<DocuFileRepository>();
    const docuFileRestorerMock = mock(DocuFileRestorer);

    afterEach(() => {
        docuFileRepositoryMock.reset();
        reset(docuFileRestorerMock);
    });

    test(`
        GIVEN a folder with docuFiles
        WHEN call to docuFile restorer by parent
        THEN call to docuFile restorer for each docuFile
    `, async () => {
        const folder = FolderPrimitiveMother.random();
        const docuFiles = DocuFilePrimitiveMother.generateWith({
            parentFolderId: folder.id
        }, 3)

        when(docuFileRepositoryMock.mockito.findByParent(deepEqual(Folder.fromPrimitives(folder))))
            .thenResolve(docuFiles.map(DocuFile.fromPrimitives));
        when(docuFileRestorerMock.run(anything())).thenResolve();

        const docuFileRestorerByParent = new DocuFileRestorerByParent(
            docuFileRepositoryMock.instance(),
            instance(docuFileRestorerMock)
        );
        await docuFileRestorerByParent.run(Folder.fromPrimitives(folder));

        docuFiles.forEach(docuFile => {
            verify(docuFileRestorerMock.run(deepEqual(DocuFile.fromPrimitives(docuFile)))).once();
        })
    });

})