import { FolderPrimitive } from "../../../Folders/Domain/Primitives/FolderPrimitive";
import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { Id } from "../../../Shared/Domain/VOs/Id"
import { DocuFileRepository } from "../Repositories/DocuFileRepository";

export class DocuFileRestorerByParent {

    constructor(
        private docuFileRepository: DocuFileRepository,
        private eventBus: EventBus,
    ) {}

    public async run(parentFolder: FolderPrimitive): Promise<void> {
        const docuFiles = await this.docuFileRepository.findByParentId(new Id(parentFolder.id))
        
        docuFiles.forEach(docuFile => docuFile.restore())

        docuFiles.forEach(async docuFile => {
            await this.docuFileRepository.save(docuFile)
            await this.eventBus.publish(docuFile.pullDomainEvents())
        })
    }
}