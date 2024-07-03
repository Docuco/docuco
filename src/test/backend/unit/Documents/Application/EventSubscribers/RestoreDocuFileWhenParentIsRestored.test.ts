import { deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { FolderFinder } from "../../../../../../app/_core/Folders/Domain/Services/FolderFinder";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";
import { FolderPrimitiveMother } from "../../../Folders/Domain/Primitives/FolderPrimitiveMother";
import { RestoreDocuFileWhenParentIsRestored } from "../../../../../../app/_core/Documents/Application/EventSubscriber/RestoreDocuFileWhenParentIsRestored";
import { DocuFileRestorerByParent } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileRestorerByParent";
import { FolderRestoredMother } from "../../../Folders/Domain/Events/FolderRestoredMother";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";

describe('RestoreDocuFileWhenParentIsRestored', () => {

    const folderFinderMock = mock(FolderFinder);
    const docuFileRestorerByParentMock = mock(DocuFileRestorerByParent);

    afterEach(() => {
        reset(folderFinderMock);
        reset(docuFileRestorerByParentMock);
    });

    test(`
        WHEN event "FolderRestored" is triggered
        THEN call to docuFile restorer by parent with the folder
    `, async () => {
        const folderPrimitive = FolderPrimitiveMother.random();
        const folderRestored = FolderRestoredMother.from(folderPrimitive);

        when(folderFinderMock.run(deepEqual(new Id(folderPrimitive.id)))).thenResolve(Folder.fromPrimitives(folderPrimitive));
        when(docuFileRestorerByParentMock.run(deepEqual(Folder.fromPrimitives(folderPrimitive)))).thenResolve();

        const restoreDocuFileWhenParentIsRestored = new RestoreDocuFileWhenParentIsRestored(
            instance(folderFinderMock),
            instance(docuFileRestorerByParentMock),
        );
        await restoreDocuFileWhenParentIsRestored.on(folderRestored);

        verify(docuFileRestorerByParentMock.run(deepEqual(Folder.fromPrimitives(folderPrimitive)))).once();
    });
})