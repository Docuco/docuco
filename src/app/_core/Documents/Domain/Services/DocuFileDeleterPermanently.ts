import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { DocuFile } from "../Entities/DocuFile";
import { DocuFileDeletedPermanently } from "../Events/DocuFileDeletedPermanently";
import { DocuFileRepository } from "../Repositories/DocuFileRepository";

export class DocuFileDeleterPermanently {

    constructor(
        private docuFileRepository: DocuFileRepository,
        private eventBus: EventBus,
    ) {}

    public async run(docuFile: DocuFile): Promise<void> {
        await this.docuFileRepository.delete(docuFile)

        this.eventBus.publish([
            new DocuFileDeletedPermanently({
                entityId: docuFile.id.value,
                attributes: docuFile.toPrimitives(),
            })
        ]);
    }
}