import { DocuFileRepository } from "../../Domain/Repositories/DocuFileRepository"
import { DocuFile } from "../../Domain/Entities/DocuFile"

export class GetDeletedDocuFiles {

    constructor(
        private docuFileRepository: DocuFileRepository,
    ) {}

    public async run(): Promise<DocuFile[]> {
        return this.docuFileRepository.getDeleted()
    }
}