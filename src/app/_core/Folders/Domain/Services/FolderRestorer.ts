import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { Folder } from "../Entities/Folder";
import { FolderRepository } from "../Repositories/FolderRepository";

export class FolderRestorer {

    constructor(
        private folderRepository: FolderRepository,
        private eventBus: EventBus,
    ) {}

    public async run(folder: Folder): Promise<void> {
        folder.restore()

        await this.folderRepository.save(folder)
        this.eventBus.publish(folder.pullDomainEvents())
    }
}