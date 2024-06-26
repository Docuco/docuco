import { ContentFile } from "../Entities/ContentFile"
import { DocuFile } from "../Entities/DocuFile"
import { DocuFileRepository } from "../Repositories/DocuFileRepository"
import { ContentFilePrimitive } from "../Primitives/ContentFilePrimitive"
import { EventBus } from "../../../Shared/Domain/Events/EventBus"

export class DocuFileSaver {

    constructor(
        private docuFileRepository: DocuFileRepository,
        private eventBus: EventBus,
    ) {}

    public async run({ contentFile, url, parentFolderId }: { contentFile: ContentFilePrimitive, url: string, parentFolderId: string | null}): Promise<void> {
        const file = ContentFile.fromPrimitives(contentFile)
        const docuFile = DocuFile.create({ file, url, parentFolderId })
        
        await this.docuFileRepository.save(docuFile)
        this.eventBus.publish(docuFile.pullDomainEvents());
    }
}