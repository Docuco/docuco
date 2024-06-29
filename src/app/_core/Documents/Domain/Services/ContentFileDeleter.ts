import { ContentFileStore } from "../Repositories/ContentFileStore"
import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { DocuFile } from "../Entities/DocuFile"
import { ContentFileDeleted } from "../Events/ContentFileDeleted"

export class ContentFileDeleter {

    constructor(
        private contentFileStore: ContentFileStore,
        private eventBus: EventBus,
    ) {}

    public async run(docuFile: DocuFile): Promise<void> {        
        await this.contentFileStore.delete(docuFile)
        
        this.eventBus.publish([
            new ContentFileDeleted({
                entityId: docuFile.id.value,
                attributes: docuFile.toPrimitives(),
            })
        ]);
    }
}