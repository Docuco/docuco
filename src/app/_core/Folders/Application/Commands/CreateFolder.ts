import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { Folder } from "../../Domain/Entities/Folder";
import { FolderRepository } from "../../Domain/Repositories/FolderRepository";
import { CreateFolderDTO } from "../DTOs/CreateFolderDTO";

export class CreateFolder {

    constructor(
        private folderRespository: FolderRepository,
        private eventBus: EventBus,
    ) { }

    public async run(folderToCreate: CreateFolderDTO): Promise<void> {
        const folder = Folder.create(folderToCreate)

        await this.folderRespository.save(folder)
        await this.eventBus.publish(folder.pullDomainEvents())
    }
}