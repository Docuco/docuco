import { DocuFileRepository } from "../Repositories/DocuFileRepository"
import { Id } from "../../../Shared/Domain/VOs/Id"
import { DocuFile } from "../Entities/DocuFile";
import { DocuFileNotFound } from "../Exceptions/DocuFileNotFound";

export class DocuFileFinder {

    constructor(
        private docuFileRepository: DocuFileRepository,
    ) {}

    public async run(idPrimitive: string): Promise<DocuFile> {
        const id = new Id(idPrimitive)
        const docuFile = await this.docuFileRepository.find(id)

        if (!docuFile) {
            throw new DocuFileNotFound(id);
        }

        return docuFile
    }
}