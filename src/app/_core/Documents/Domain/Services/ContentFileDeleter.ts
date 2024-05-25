import { ContentFileStore } from "../Repositories/ContentFileStore"
import { EventBus } from "../../../Shared/Domain/Events/EventBus"
import { DocuFilePrimitive } from "../Primitives/DocuFilePrimitive"
import { DocuFile } from "../Entities/DocuFile"
import { ContentFileDeleted } from "../Events/ContentFileDeleted"

export class ContentFileDeleter {

    constructor(
        private contentFileStore: ContentFileStore,
        private eventBus: EventBus,
    ) {}

    public async run(docuFilePrimitive: DocuFilePrimitive): Promise<void> {
        const docuFile = DocuFile.fromPrimitives(docuFilePrimitive)
        await this.contentFileStore.delete(docuFile)
        
        this.eventBus.publish([
            new ContentFileDeleted({
                entityId: docuFile.id.value,
                attributes: docuFile.toPrimitives(),
            })
        ]);
    }
}