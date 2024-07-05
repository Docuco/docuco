import { anything, deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { FolderFinder } from "../../../../../../app/_core/Folders/Domain/Services/FolderFinder";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { FolderPrimitiveMother } from "../../Domain/Primitives/FolderPrimitiveMother";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";
import { FolderDeleterPermanently } from "../../../../../../app/_core/Folders/Domain/Services/FolderDeleterPermanently";
import { DeletePermanentlyFolder } from "../../../../../../app/_core/Folders/Application/Commands/DeletePermanentlyFolder";

describe('DeletePermanentlyFolder', () => {

    const folderFinderMock = mock(FolderFinder);
    const folderDeleterPermanentlyMock = mock(FolderDeleterPermanently);

    afterEach(() => {
        reset(folderFinderMock);
        reset(folderDeleterPermanentlyMock);
    });

    test(`
        GIVEN a existing folder
        WHEN delete folder permanently
        THEN call to folder deleter permanently with the folder
    `, async () => {
        const folderId = Id.new().value;
        const folder = FolderPrimitiveMother.from({
            id: folderId,
        });

        when(folderFinderMock.run(deepEqual(new Id(folderId)))).thenResolve(Folder.fromPrimitives(folder));
        when(folderDeleterPermanentlyMock.run(anything())).thenResolve();

        const deletePermanentlyFolder = new DeletePermanentlyFolder(
            instance(folderFinderMock),
            instance(folderDeleterPermanentlyMock),
        );
        await deletePermanentlyFolder.run({ id: folderId });

        verify(folderDeleterPermanentlyMock.run(deepEqual(Folder.fromPrimitives(folder)))).once();
    });

})