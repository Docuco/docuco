import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { FolderRepository } from "../Repositories/FolderRepository";
import { Folder } from "../Entities/Folder";

export class FolderDeleter {

    constructor(
        private folderRepository: FolderRepository,
        private eventBus: EventBus,
    ) {}

    public async run(folder: Folder): Promise<void> {
        folder.delete()

        await this.folderRepository.save(folder)
        this.eventBus.publish(folder.pullDomainEvents())
    }
}