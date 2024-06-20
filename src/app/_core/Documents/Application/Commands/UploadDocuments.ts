import { ContentFileUploader } from "../../Domain/Services/ContentFileUploader"

export class UploadDocuments {

    constructor(
        private contentFileUploader: ContentFileUploader,
    ) {}

    public async run({ files, folderParentId }: { files: File[], folderParentId: string | null }): Promise<void> {
        await Promise.all(files.map((file) => this.contentFileUploader.run({ file, folderParentId })))
    }
}