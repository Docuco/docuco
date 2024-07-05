import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { FolderFinder } from "../../Domain/Services/FolderFinder"
import { FolderRestorer } from "../../Domain/Services/FolderRestorer";

export class RestoreFolder {

    constructor(
        private folderFinder: FolderFinder,
        private folderRestorer: FolderRestorer,
        private eventBus: EventBus,
    ) {}

    public async run({ id }: { id: string }): Promise<void> {
        const folder = await this.folderFinder.run(new Id(id))

        folder.unlinkFromParent()
        
        await this.folderRestorer.run(folder)
        this.eventBus.publish(folder.pullDomainEvents())
    }
}