import { deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { FolderFinder } from "../../../../../../app/_core/Folders/Domain/Services/FolderFinder";
import { FolderPrimitiveMother } from "../../Domain/Primitives/FolderPrimitiveMother";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";
import { DeletePermanentlyFolderWhenParentIsDeletedPermanently } from "../../../../../../app/_core/Folders/Application/EventSubscriber/DeletePermanentlyFolderWhenParentIsDeletedPermanently";
import { FolderDeleterPermanentlyByParent } from "../../../../../../app/_core/Folders/Domain/Services/FolderDeleterPermanentlyByParent";
import { FolderDeletedPermanentlyMother } from "../../Domain/Events/FolderDeletedPermanentlyMother";

describe('DeletePermanentlyFolderWhenParentIsDeletedPermanently', () => {

    const folderFinderMock = mock(FolderFinder);
    const folderDeleterPermanentlyByParentMock = mock(FolderDeleterPermanentlyByParent);

    afterEach(() => {
        reset(folderFinderMock);
        reset(folderDeleterPermanentlyByParentMock);
    });

    test(`
        WHEN event "FolderDeletedPermanently" is triggered
        THEN call to folder deleter permanently by parent with the folder
    `, async () => {
        const folderPrimitive = FolderPrimitiveMother.random();
        const folderDeletedPermanently = FolderDeletedPermanentlyMother.from(folderPrimitive);

        when(folderFinderMock.run(deepEqual(new Id(folderPrimitive.id)))).thenResolve(Folder.fromPrimitives(folderPrimitive));

        const deletePermanentlyFolderWhenParentIsDeletedPermanently = new DeletePermanentlyFolderWhenParentIsDeletedPermanently(
            instance(folderFinderMock),
            instance(folderDeleterPermanentlyByParentMock),
        );
        await deletePermanentlyFolderWhenParentIsDeletedPermanently.on(folderDeletedPermanently);

        verify(folderDeleterPermanentlyByParentMock.run(deepEqual(Folder.fromPrimitives(folderPrimitive)))).once();
    });
})