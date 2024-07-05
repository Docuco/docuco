import { anything, when } from "ts-mockito";
import { EventBusMock } from "../../../Shared/Infrastructure/EventBusMock";
import { CreateFolder } from "../../../../../../app/_core/Folders/Application/Commands/CreateFolder";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { FolderRepository } from "../../../../../../app/_core/Folders/Domain/Repositories/FolderRepository";
import { FolderCreated } from "../../../../../../app/_core/Folders/Domain/Events/FolderCreated";
import { CreateFolderDTOMother } from "../DTOs/CreateFolderDTOMother";

describe('CreateFolder', () => {

    const folderRepositoryMock = new InterfaceMock<FolderRepository>();
    const eventBusMock = new EventBusMock();

    afterEach(() => {
        folderRepositoryMock.reset();
        eventBusMock.reset();
    });

    test(`
        GIVEN a create folder DTO
        WHEN call to create folder
        THEN save the folder
        AND send "FolderCreated" event
    `, async () => {
        const createFolderDTO = CreateFolderDTOMother.random();

        when(folderRepositoryMock.mockito.save(anything())).thenResolve();

        const createFolder = new CreateFolder(
            folderRepositoryMock.instance(),
            eventBusMock.instance(),
        );
        await createFolder.run(createFolderDTO);

        folderRepositoryMock.expectMethodToHaveBeenCalledTimes('save', 1);
        eventBusMock.expectEventToHaveBeenPublishedWithAttributes(FolderCreated, {
            id: expect.any(String),
            name: createFolderDTO.name,
            parentFolderId: createFolderDTO.parentFolderId,
            isDeleted: false,
            createdAt: expect.any(Number),
            updatedAt: expect.any(Number),
        });
    });

})