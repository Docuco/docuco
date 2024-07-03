import { deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { FolderFinder } from "../../../../../../app/_core/Folders/Domain/Services/FolderFinder";
import { DocuFileDeleterByParent } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileDeleterByParent";
import { DeleteDocuFileWhenParentIsDeleted } from "../../../../../../app/_core/Documents/Application/EventSubscriber/DeleteDocuFileWhenParentIsDeleted";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";
import { FolderPrimitiveMother } from "../../../Folders/Domain/Primitives/FolderPrimitiveMother";
import { FolderDeletedMother } from "../../../Folders/Domain/Events/FolderDeletedMother";

describe('DeleteDocuFileWhenParentIsDeleted', () => {

    const folderFinderMock = mock(FolderFinder);
    const docuFileDeleterByParentMock = mock(DocuFileDeleterByParent);

    afterEach(() => {
        reset(folderFinderMock);
        reset(docuFileDeleterByParentMock);
    });

    test(`
        GIVEN an existing folder
        WHEN event "FolderDeleted" is triggered
        THEN call to docuFile deleter by parent with the folder
    `, async () => {
        const folderPrimitive = FolderPrimitiveMother.random();
        const folderDeleted = FolderDeletedMother.from(folderPrimitive);

        when(folderFinderMock.run(deepEqual(new Id(folderPrimitive.id)))).thenResolve(Folder.fromPrimitives(folderPrimitive));
        when(docuFileDeleterByParentMock.run(deepEqual(Folder.fromPrimitives(folderPrimitive)))).thenResolve();

        const deleteDocuFileWhenParentIsDeleted = new DeleteDocuFileWhenParentIsDeleted(
            instance(folderFinderMock),
            instance(docuFileDeleterByParentMock),
        );
        await deleteDocuFileWhenParentIsDeleted.on(folderDeleted);

        verify(docuFileDeleterByParentMock.run(deepEqual(Folder.fromPrimitives(folderPrimitive)))).once();
    });
})