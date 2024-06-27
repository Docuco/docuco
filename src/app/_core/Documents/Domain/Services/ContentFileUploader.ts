import { ContentFile } from "../Entities/ContentFile"
import { ContentFileUploaded } from "../Events/ContentFileUploaded"
import { ContentFileStore } from "../Repositories/ContentFileStore"
import { EventBus } from "../../../Shared/Domain/Events/EventBus"

export class ContentFileUploader {

    constructor(
        private contentFileStore: ContentFileStore,
        private eventBus: EventBus,
    ) {}

    public async run({ file, folderParentId }: { file: File, folderParentId: string | null}): Promise<void> {
        const contentFile = ContentFile.create(file)
        const { url } = await this.contentFileStore.upload(contentFile)
        
        await this.eventBus.publish([
            new ContentFileUploaded({
                entityId: contentFile.id.value,
                attributes: {
                    contentFile: contentFile.toPrimitives(),
                    url,
                    folderParentId
                },
            })
        ]);
    }
}