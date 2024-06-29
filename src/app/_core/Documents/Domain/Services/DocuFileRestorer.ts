import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { DocuFile } from "../Entities/DocuFile";
import { DocuFileRepository } from "../Repositories/DocuFileRepository";

export class DocuFileRestorer {

    constructor(
        private docuFileRepository: DocuFileRepository,
        private eventBus: EventBus,
    ) {}

    public async run(docuFile: DocuFile): Promise<void> {
        docuFile.restore()

        await this.docuFileRepository.save(docuFile)
        this.eventBus.publish(docuFile.pullDomainEvents())
    }
}