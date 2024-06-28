import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { FolderDeletedPermanently } from "../../Domain/Events/FolderDeletedPermanently";
import { FolderRepository } from "../../Domain/Repositories/FolderRepository";
import { FolderFinder } from "../../Domain/Services/FolderFinder";

export class DeletePermanentlyFolder {

    constructor(
        private folderFinder: FolderFinder,
        private folderRepository: FolderRepository,
        private eventBus: EventBus,
    ) {}

    public async run({ id }: { id: string }): Promise<void> {
        const folder = await this.folderFinder.run(id)
        await this.folderRepository.delete(folder)

        await this.eventBus.publish([
            new FolderDeletedPermanently({
                entityId: folder.id.value,
                attributes: folder.toPrimitives(),
            })
        ]);
    }
}