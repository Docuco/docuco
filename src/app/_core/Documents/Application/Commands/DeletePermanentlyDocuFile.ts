import { EventBus } from "../../../Shared/Domain/Events/EventBus";
import { DocuFileRepository } from "../../Domain/Contracts/DocuFileRepository"
import { DocuFileDeletedPermanently } from "../../Domain/Events/DocuFileDeletedPermanently";
import { DocuFileFinder } from "../../Domain/Services/DocuFileFinder"

export class DeletePermanentlyDocuFile {

    constructor(
        private docuFileFinder: DocuFileFinder,
        private docuFileRepository: DocuFileRepository,
        private eventBus: EventBus,
    ) {}

    public async run(idPrimitive: string): Promise<void> {
        const docuFile = await this.docuFileFinder.run(idPrimitive)
        await this.docuFileRepository.delete(docuFile)

        this.eventBus.publish([
            new DocuFileDeletedPermanently({
                entityId: docuFile.id.value,
                attributes: docuFile.toPrimitives(),
            })
        ]);
    }
}