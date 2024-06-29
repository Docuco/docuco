import { Folder } from "../../../Folders/Domain/Entities/Folder";
import { DocuFileRepository } from "../Repositories/DocuFileRepository";
import { DocuFileDeleter } from "./DocuFileDeleter";

export class DocuFileDeleterByParent {

    constructor(
        private docuFileRepository: DocuFileRepository,
        private docuFileDeleter: DocuFileDeleter,
    ) {}

    public async run(parentFolder: Folder): Promise<void> {
        const docuFiles = await this.docuFileRepository.findByParent(parentFolder)
        
        await Promise.all(docuFiles.map(docuFile => this.docuFileDeleter.run(docuFile)))
    }
}