import { ContentFileUploader } from "../../Domain/Services/ContentFileUploader"

export class UploadDocuments {

    constructor(
        private contentFileUploader: ContentFileUploader,
    ) {}

    public async run({ files }: { files: File[]}): Promise<void> {
        await Promise.all(files.map((file) => this.contentFileUploader.run(file)))
    }
}