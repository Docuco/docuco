import { deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { FolderFinder } from "../../../../../../app/_core/Folders/Domain/Services/FolderFinder";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";
import { FolderPrimitiveMother } from "../../../Folders/Domain/Primitives/FolderPrimitiveMother";
import { DeletePermanentlyDocuFileWhenParentIsDeletedPermanently } from "../../../../../../app/_core/Documents/Application/EventSubscriber/DeletePermanentlyDocuFileWhenParentIsDeletedPermanently";
import { DocuFileDeleterPermanentlyByParent } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileDeleterPermanentlyByParent";
import { FolderDeletedPermanentlyMother } from "../../../Folders/Domain/Events/FolderDeletedPermanentlyMother";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";

describe('DeletePermanentlyDocuFileWhenParentIsDeletedPermanently', () => {

    const folderFinderMock = mock(FolderFinder);
    const docuFileDeleterPermanentlyByParentMock = mock(DocuFileDeleterPermanentlyByParent);

    afterEach(() => {
        reset(folderFinderMock);
        reset(docuFileDeleterPermanentlyByParentMock);
    });

    test(`
        WHEN event "FolderDeletedPermanently" is triggered
        THEN call to docuFile deleter permanently by parent with the folder
    `, async () => {
        const folderPrimitive = FolderPrimitiveMother.random();
        const folderDeletedPermanently = FolderDeletedPermanentlyMother.from(folderPrimitive);

        when(folderFinderMock.run(deepEqual(new Id(folderPrimitive.id)))).thenResolve(Folder.fromPrimitives(folderPrimitive));
        when(docuFileDeleterPermanentlyByParentMock.run(deepEqual(Folder.fromPrimitives(folderPrimitive)))).thenResolve();

        const deletePermanentlyDocuFileWhenParentIsDeletedPermanently = new DeletePermanentlyDocuFileWhenParentIsDeletedPermanently(
            instance(folderFinderMock),
            instance(docuFileDeleterPermanentlyByParentMock),
        );
        await deletePermanentlyDocuFileWhenParentIsDeletedPermanently.on(folderDeletedPermanently);

        verify(docuFileDeleterPermanentlyByParentMock.run(deepEqual(Folder.fromPrimitives(folderPrimitive)))).once();
    });
})