import { ContentFile } from "../Entities/ContentFile"
import { DocuFile } from "../Entities/DocuFile"
import { DocuFileRepository } from "../Contracts/DocuFileRepository"
import { ContentFilePrimitive } from "../Primitives/ContentFilePrimitive"
import { EventBus } from "../../../Shared/Domain/Events/EventBus"

export class DocuFileSaver {

    constructor(
        private docuFileRepository: DocuFileRepository,
        private eventBus: EventBus,
    ) {}

    public async run(filePrimitive: ContentFilePrimitive, url: string): Promise<void> {
        const file = ContentFile.fromPrimitives(filePrimitive)
        const docuFile = DocuFile.create({ file, url })
        await this.docuFileRepository.save(docuFile)

        this.eventBus.publish(docuFile.pullDomainEvents());

        return
    }
}