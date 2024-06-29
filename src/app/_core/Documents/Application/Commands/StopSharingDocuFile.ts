import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { Id } from "../../../Shared/Domain/VOs/Id";
import { DocuFileRepository } from "../../Domain/Repositories/DocuFileRepository"
import { DocuFileFinder } from "../../Domain/Services/DocuFileFinder"

export class StopSharingDocuFile {

    constructor(
        private docuFileFinder: DocuFileFinder,
        private docuFileRepository: DocuFileRepository,
        private eventBus: EventBus,
    ) {}

    public async run({ id }: { id: string }): Promise<void> {
        const docuFile = await this.docuFileFinder.run(new Id(id))
        
        docuFile.stopSharing()
        
        await this.docuFileRepository.save(docuFile)
        this.eventBus.publish(docuFile.pullDomainEvents());
    }
}