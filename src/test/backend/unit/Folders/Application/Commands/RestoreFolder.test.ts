import { anything, deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { FolderFinder } from "../../../../../../app/_core/Folders/Domain/Services/FolderFinder";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { FolderPrimitiveMother } from "../../Domain/Primitives/FolderPrimitiveMother";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";
import { RestoreFolder } from "../../../../../../app/_core/Folders/Application/Commands/RestoreFolder";
import { FolderRestorer } from "../../../../../../app/_core/Folders/Domain/Services/FolderRestorer";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { FolderUnlinkedFromParent } from "../../../../../../app/_core/Folders/Domain/Events/FolderUnlinkedFromParent";

describe('RestoreFolder', () => {

    const folderFinderMock = mock(FolderFinder);
    const folderRestorerMock = mock(FolderRestorer);
    const eventBusMock = new EventBusMock()

    afterEach(() => {
        reset(folderFinderMock);
        reset(folderRestorerMock);
        eventBusMock.reset();
    });

    test(`
        GIVEN a existing folder with a parent folder
        WHEN restore folder
        THEN call to folder restorer with the folder
        AND send "FolderUnlinkedFromParent" event with parentFolderId null
    `, async () => {
        const folderId = Id.new().value;
        const folder = FolderPrimitiveMother.from({
            id: folderId,
            parentFolderId: Id.new().value
        });

        when(folderFinderMock.run(deepEqual(new Id(folderId)))).thenResolve(Folder.fromPrimitives(folder));
        when(folderRestorerMock.run(anything())).thenResolve();

        const restoreFolder = new RestoreFolder(
            instance(folderFinderMock),
            instance(folderRestorerMock),
            eventBusMock.instance()
        );
        await restoreFolder.run({ id: folderId });

        verify(folderRestorerMock.run(anything())).once();
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(FolderUnlinkedFromParent, {
            id: folderId,
            parentFolderId: null
        })
    });

    test(`
        GIVEN a existing folder without a parent folder
        WHEN restore folder
        THEN call to folder restorer with the folder
        AND not send "FolderUnlinkedFromParent" event
    `, async () => {
        const folderId = Id.new().value;
        const folder = FolderPrimitiveMother.from({
            id: folderId,
            parentFolderId: null
        });

        when(folderFinderMock.run(deepEqual(new Id(folderId)))).thenResolve(Folder.fromPrimitives(folder));
        when(folderRestorerMock.run(anything())).thenResolve();

        const restoreFolder = new RestoreFolder(
            instance(folderFinderMock),
            instance(folderRestorerMock),
            eventBusMock.instance()
        );
        await restoreFolder.run({ id: folderId });

        verify(folderRestorerMock.run(anything())).once();
        eventBusMock.expectEventNotPublished(FolderUnlinkedFromParent)
    });
})