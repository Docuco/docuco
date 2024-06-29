import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { DocuFile } from "../Entities/DocuFile";
import { DocuFileRepository } from "../Repositories/DocuFileRepository";

export class DocuFileDeleter {

    constructor(
        private docuFileRepository: DocuFileRepository,
        private eventBus: EventBus,
    ) {}

    public async run(docuFile: DocuFile): Promise<void> {
        docuFile.delete()

        await this.docuFileRepository.save(docuFile)
        this.eventBus.publish(docuFile.pullDomainEvents())
    }
}