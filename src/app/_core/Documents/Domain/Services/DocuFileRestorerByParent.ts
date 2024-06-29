import { Folder } from "../../../Folders/Domain/Entities/Folder";
import { DocuFileRepository } from "../Repositories/DocuFileRepository";
import { DocuFileRestorer } from "./DocuFileRestorer";

export class DocuFileRestorerByParent {

    constructor(
        private docuFileRepository: DocuFileRepository,
        private docuFileRestorer: DocuFileRestorer,
    ) {}

    public async run(parentFolder: Folder): Promise<void> {
        const docuFiles = await this.docuFileRepository.findByParent(parentFolder)
        
        await Promise.all(docuFiles.map(docuFile => this.docuFileRestorer.run(docuFile)))
    }
}