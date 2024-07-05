import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { FolderDeleter } from "../../Domain/Services/FolderDeleter";
import { FolderFinder } from "../../Domain/Services/FolderFinder"

export class DeleteFolder {

    constructor(
        private folderFinder: FolderFinder,
        private folderDeleter: FolderDeleter,
        private eventBus: EventBus,
    ) {}

    public async run({ id }: { id: string}): Promise<void> {
        const folder = await this.folderFinder.run(new Id(id))
        
        folder.unlinkFromParent()
        
        await this.folderDeleter.run(folder)
        this.eventBus.publish(folder.pullDomainEvents())
    }
}