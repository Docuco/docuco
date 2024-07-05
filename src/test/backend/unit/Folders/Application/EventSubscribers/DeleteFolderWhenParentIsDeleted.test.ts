import { deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { DeleteFolderWhenParentIsDeleted } from "../../../../../../app/_core/Folders/Application/EventSubscriber/DeleteFolderWhenParentIsDeleted";
import { FolderFinder } from "../../../../../../app/_core/Folders/Domain/Services/FolderFinder";
import { FolderDeleterByParent } from "../../../../../../app/_core/Folders/Domain/Services/FolderDeleterByParent";
import { FolderPrimitiveMother } from "../../Domain/Primitives/FolderPrimitiveMother";
import { FolderDeletedMother } from "../../Domain/Events/FolderDeletedMother";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";

describe('DeleteFolderWhenParentIsDeleted', () => {

    const folderFinderMock = mock(FolderFinder);
    const folderDeleterByParentMock = mock(FolderDeleterByParent);

    afterEach(() => {
        reset(folderFinderMock);
        reset(folderDeleterByParentMock);
    });

    test(`
        WHEN event "DeleteFolderWhenParentIsDeleted" is triggered
        THEN call to folder deleter by parent with the folder
    `, async () => {
        const folderPrimitive = FolderPrimitiveMother.random();
        const folderDeleted = FolderDeletedMother.from(folderPrimitive);

        when(folderFinderMock.run(deepEqual(new Id(folderPrimitive.id)))).thenResolve(Folder.fromPrimitives(folderPrimitive));

        const deleteFolderWhenParentIsDeleted = new DeleteFolderWhenParentIsDeleted(
            instance(folderFinderMock),
            instance(folderDeleterByParentMock),
        );
        await deleteFolderWhenParentIsDeleted.on(folderDeleted);

        verify(folderDeleterByParentMock.run(deepEqual(Folder.fromPrimitives(folderPrimitive)))).once();
    });
})