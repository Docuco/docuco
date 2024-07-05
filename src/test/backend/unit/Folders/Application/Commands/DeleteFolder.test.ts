import { anything, deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { DeleteFolder } from "../../../../../../app/_core/Folders/Application/Commands/DeleteFolder";
import { FolderFinder } from "../../../../../../app/_core/Folders/Domain/Services/FolderFinder";
import { FolderDeleter } from "../../../../../../app/_core/Folders/Domain/Services/FolderDeleter";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { FolderPrimitiveMother } from "../../Domain/Primitives/FolderPrimitiveMother";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { FolderUnlinkedFromParent } from "../../../../../../app/_core/Folders/Domain/Events/FolderUnlinkedFromParent";

describe('DeleteFolder', () => {

    const folderFinderMock = mock(FolderFinder);
    const folderDeleterMock = mock(FolderDeleter);
    const eventBusMock = new EventBusMock()

    afterEach(() => {
        reset(folderFinderMock);
        reset(folderDeleterMock);
        eventBusMock.reset();
    });

    test(`
        GIVEN a existing folder with a parent folder
        WHEN call to delete folder
        THEN call to folder deleter with the folder
        AND send "FolderUnlinkedFromParent" event with parentFolderId null
    `, async () => {
        const folderId = Id.new().value;
        const folder = FolderPrimitiveMother.from({
            id: folderId,
            parentFolderId: Id.new().value
        });

        when(folderFinderMock.run(deepEqual(new Id(folderId)))).thenResolve(Folder.fromPrimitives(folder));
        when(folderDeleterMock.run(anything())).thenResolve();

        const deleteFolder = new DeleteFolder(
            instance(folderFinderMock),
            instance(folderDeleterMock),
            eventBusMock.instance()
        );
        await deleteFolder.run({ id: folderId });

        verify(folderDeleterMock.run(anything())).once();
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(FolderUnlinkedFromParent, {
            id: folderId,
            parentFolderId: null
        })
    });

    test(`
        GIVEN a existing folder without parent folder
        WHEN call to delete folder
        THEN call to folder deleter with the folder
        AND not send "FolderUnlinkedFromParent" event
    `, async () => {
        const folderId = Id.new().value;
        const folder = FolderPrimitiveMother.from({
            id: folderId,
            parentFolderId: null
        });

        when(folderFinderMock.run(deepEqual(new Id(folderId)))).thenResolve(Folder.fromPrimitives(folder));
        when(folderDeleterMock.run(anything())).thenResolve();

        const deleteFolder = new DeleteFolder(
            instance(folderFinderMock),
            instance(folderDeleterMock),
            eventBusMock.instance()
        );
        await deleteFolder.run({ id: folderId });

        verify(folderDeleterMock.run(deepEqual(Folder.fromPrimitives(folder)))).once();
        eventBusMock.expectEventNotPublished(FolderUnlinkedFromParent)
    });

})