import { DocuFileRepository } from "../Repositories/DocuFileRepository"
import { Id } from "../../../Shared/Domain/VOs/Id"
import { DocuFile } from "../Entities/DocuFile";
import { DocuFileNotFound } from "../Exceptions/DocuFileNotFound";

export class DocuFileFinder {

    constructor(
        private docuFileRepository: DocuFileRepository,
    ) {}

    public async run(id: Id): Promise<DocuFile> {
        const docuFileOption = await this.docuFileRepository.findById(id)
        const docuFile = docuFileOption.getOrThrow(new DocuFileNotFound(id.value))

        return docuFile
    }
}