import { ContentFile } from "../Entities/ContentFile"
import { ContentFileUploaded } from "../Events/ContentFileUploaded"
import { ContentFileStore } from "../Contracts/ContentFileStore"
import { EventBus } from "../../../Shared/Domain/Events/EventBus"

export class ContentFileUploader {

    constructor(
        private contentFileStore: ContentFileStore,
        private eventBus: EventBus,
    ) {}

    public async run(filePrimitive: File): Promise<void> {
        const contentFile = ContentFile.create(filePrimitive)
        const { url } = await this.contentFileStore.upload(contentFile)
        
        this.eventBus.publish([
            new ContentFileUploaded({
                entityId: contentFile.id.value,
                attributes: {
                    contentFile: contentFile.toPrimitives(),
                    url,
                },
            })
        ]);
    }
}