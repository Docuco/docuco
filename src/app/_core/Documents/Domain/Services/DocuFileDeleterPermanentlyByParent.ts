import { Folder } from "../../../Folders/Domain/Entities/Folder";
import { DocuFileRepository } from "../Repositories/DocuFileRepository";
import { DocuFileDeleterPermanently } from "./DocuFileDeleterPermanently";

export class DocuFileDeleterPermanentlyByParent {

    constructor(
        private docuFileRepository: DocuFileRepository,
        private docuFileDeleterPermanently: DocuFileDeleterPermanently,
    ) {}

    public async run(parentFolder: Folder): Promise<void> {
        const docuFiles = await this.docuFileRepository.findByParent(parentFolder)
        
        await Promise.all(docuFiles.map(docuFile => this.docuFileDeleterPermanently.run(docuFile)))
    }
}