import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { FolderRepository } from "../../Domain/Repositories/FolderRepository"
import { FolderFinder } from "../../Domain/Services/FolderFinder"

export class RestoreFolder {

    constructor(
        private folderFinder: FolderFinder,
        private folderRepository: FolderRepository,
        private eventBus: EventBus,
    ) {}

    public async run({ id }: { id: string }): Promise<void> {
        const folder = await this.folderFinder.run(id)

        folder.unlinkFromParent()
        folder.restore()
        await this.folderRepository.save(folder)

        await this.eventBus.publish(folder.pullDomainEvents());
    }
}