import { DocuFileRepository } from "../../Domain/Contracts/DocuFileRepository"
import { DocuFile } from "../../Domain/Entities/DocuFile"

export class GetDocuFiles {

    constructor(
        private docuFileRepository: DocuFileRepository,
    ) {}

    public async run(): Promise<DocuFile[]> {
        return this.docuFileRepository.getAll()
    }
}