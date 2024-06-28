import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { Id } from "../../../Shared/Domain/VOs/Id"
import { FolderDeletedPermanently } from "../Events/FolderDeletedPermanently";
import { FolderPrimitive } from "../Primitives/FolderPrimitive";
import { FolderRepository } from "../Repositories/FolderRepository";

export class FolderDeleterPermanentlyByParent {

    constructor(
        private folderRepository: FolderRepository,
        private eventBus: EventBus,
    ) {}

    public async run(parentFolder: FolderPrimitive): Promise<void> {
        const folders = await this.folderRepository.findByParentId(new Id(parentFolder.id))
        
        folders.forEach(async folder => {     
            await this.folderRepository.delete(folder)
    
            await this.eventBus.publish([
                new FolderDeletedPermanently({
                    entityId: folder.id.value,
                    attributes: folder.toPrimitives(),
                })
            ]);
        })
    }
}