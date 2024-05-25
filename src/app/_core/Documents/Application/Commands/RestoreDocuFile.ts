import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { DocuFileRepository } from "../../Domain/Repositories/DocuFileRepository"
import { DocuFileFinder } from "../../Domain/Services/DocuFileFinder"

export class RestoreDocuFile {

    constructor(
        private docuFileFinder: DocuFileFinder,
        private docuFileRepository: DocuFileRepository,
        private eventBus: EventBus,
    ) {}

    public async run(idPrimitive: string): Promise<void> {
        const docuFile = await this.docuFileFinder.run(idPrimitive)
        
        docuFile.restore()
        await this.docuFileRepository.save(docuFile)

        this.eventBus.publish(docuFile.pullDomainEvents());
    }
}