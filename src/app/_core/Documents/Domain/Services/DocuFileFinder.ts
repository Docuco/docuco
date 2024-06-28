import { DocuFileRepository } from "../Repositories/DocuFileRepository"
import { Id } from "../../../Shared/Domain/VOs/Id"
import { DocuFile } from "../Entities/DocuFile";
import { DocuFileNotFound } from "../Exceptions/DocuFileNotFound";

export class DocuFileFinder {

    constructor(
        private docuFileRepository: DocuFileRepository,
    ) {}

    public async run(id: string): Promise<DocuFile> {
        const docuFileOption = await this.docuFileRepository.findById(new Id(id))
        const docuFile = docuFileOption.getOrThrow(new DocuFileNotFound(id))

        return docuFile
    }
}