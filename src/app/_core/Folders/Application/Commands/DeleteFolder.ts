import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { FolderRepository } from "../../Domain/Repositories/FolderRepository"
import { FolderFinder } from "../../Domain/Services/FolderFinder"

export class DeleteFolder {

    constructor(
        private folderFinder: FolderFinder,
        private folderRepository: FolderRepository,
        private eventBus: EventBus,
    ) {}

    public async run({ id }: { id: string}): Promise<void> {
        const folder = await this.folderFinder.run(id)
        
        folder.delete()
        await this.folderRepository.save(folder)

        this.eventBus.publish(folder.pullDomainEvents());
    }
}