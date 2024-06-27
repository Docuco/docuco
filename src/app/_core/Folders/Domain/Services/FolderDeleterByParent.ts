import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { Id } from "../../../Shared/Domain/VOs/Id"
import { FolderPrimitive } from "../Primitives/FolderPrimitive";
import { FolderRepository } from "../Repositories/FolderRepository";

export class FolderDeleterByParent {

    constructor(
        private folderRepository: FolderRepository,
        private eventBus: EventBus,
    ) {}

    public async run(parentFolder: FolderPrimitive): Promise<void> {
        const folders = await this.folderRepository.findByParentId(new Id(parentFolder.id))
        
        folders.forEach(folder => folder.delete())

        folders.forEach(async folder => {
            await this.folderRepository.save(folder)
            await this.eventBus.publish(folder.pullDomainEvents())
        })
    }
}