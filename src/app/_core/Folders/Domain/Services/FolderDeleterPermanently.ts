import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { FolderRepository } from "../Repositories/FolderRepository";
import { FolderDeletedPermanently } from "../Events/FolderDeletedPermanently";
import { Folder } from "../Entities/Folder";

export class FolderDeleterPermanently {

    constructor(
        private folderRepository: FolderRepository,
        private eventBus: EventBus,
    ) {}

    public async run(folder: Folder): Promise<void> {
        await this.folderRepository.delete(folder)

        this.eventBus.publish([
            new FolderDeletedPermanently({
                entityId: folder.id.value,
                attributes: folder.toPrimitives(),
            })
        ]);
    }
}