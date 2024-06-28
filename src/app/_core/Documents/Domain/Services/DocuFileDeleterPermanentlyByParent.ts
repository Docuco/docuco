import { FolderPrimitive } from "../../../Folders/Domain/Primitives/FolderPrimitive";
import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { Id } from "../../../Shared/Domain/VOs/Id"
import { DocuFileDeletedPermanently } from "../Events/DocuFileDeletedPermanently";
import { DocuFileRepository } from "../Repositories/DocuFileRepository";

export class DocuFileDeleterPermanentlyByParent {

    constructor(
        private docuFileRepository: DocuFileRepository,
        private eventBus: EventBus,
    ) {}

    public async run(parentFolder: FolderPrimitive): Promise<void> {
        const docuFiles = await this.docuFileRepository.findByParentId(new Id(parentFolder.id))
        
        docuFiles.forEach(async folder => {     
            await this.docuFileRepository.delete(folder)
    
            await this.eventBus.publish([
                new DocuFileDeletedPermanently({
                    entityId: folder.id.value,
                    attributes: folder.toPrimitives(),
                })
            ]);
        })
    }
}