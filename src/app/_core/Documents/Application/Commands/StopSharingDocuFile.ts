import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { DocuFileRepository } from "../../Domain/Repositories/DocuFileRepository"
import { DocuFileFinder } from "../../Domain/Services/DocuFileFinder"

export class StopSharingDocuFile {

    constructor(
        private docuFileFinder: DocuFileFinder,
        private docuFileRepository: DocuFileRepository,
        private eventBus: EventBus,
    ) {}

    public async run({ id }: { id: string }): Promise<void> {
        const docuFile = await this.docuFileFinder.run(id)
        
        docuFile.stopSharing()
        await this.docuFileRepository.save(docuFile)

        await this.eventBus.publish(docuFile.pullDomainEvents());
    }
}