import { DocuFileRepository } from "../Repositories/DocuFileRepository"
import { Id } from "../../../Shared/Domain/VOs/Id"
import { DocuFile } from "../Entities/DocuFile";
import { DocuFileNotFound } from "../Exceptions/DocuFileNotFound";

export class DocuFileFinder {

    constructor(
        private docuFileRepository: DocuFileRepository,
    ) {}

    public async run(id: string): Promise<DocuFile> {
        const docuFile = await this.docuFileRepository.findById(new Id(id))

        if (!docuFile) {
            throw new DocuFileNotFound(id);
        }

        return docuFile.get()
    }
}