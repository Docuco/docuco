import { deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { FolderFinder } from "../../../../../../app/_core/Folders/Domain/Services/FolderFinder";
import { FolderPrimitiveMother } from "../../Domain/Primitives/FolderPrimitiveMother";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";
import { RestoreFolderWhenParentIsRestored } from "../../../../../../app/_core/Folders/Application/EventSubscriber/RestoreFolderWhenParentIsRestored";
import { FolderRestorerByParent } from "../../../../../../app/_core/Folders/Domain/Services/FolderRestorerByParent";
import { FolderRestoredMother } from "../../Domain/Events/FolderRestoredMother";

describe('RestoreFolderWhenParentIsRestored', () => {

    const folderFinderMock = mock(FolderFinder);
    const folderRestorerByParentMock = mock(FolderRestorerByParent);

    afterEach(() => {
        reset(folderFinderMock);
        reset(folderRestorerByParentMock);
    });

    test(`
        WHEN event "FolderRestored" is triggered
        THEN call to folder restorer by parent with the folder
    `, async () => {
        const folderPrimitive = FolderPrimitiveMother.random();
        const folderRestored = FolderRestoredMother.from(folderPrimitive);

        when(folderFinderMock.run(deepEqual(new Id(folderPrimitive.id)))).thenResolve(Folder.fromPrimitives(folderPrimitive));

        const restoreFolderWhenParentIsRestored = new RestoreFolderWhenParentIsRestored(
            instance(folderFinderMock),
            instance(folderRestorerByParentMock),
        );
        await restoreFolderWhenParentIsRestored.on(folderRestored);

        verify(folderRestorerByParentMock.run(deepEqual(Folder.fromPrimitives(folderPrimitive)))).once();
    });
})