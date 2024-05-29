import { DocuFileRepository } from "../../Domain/Repositories/DocuFileRepository"
import { DocuFile } from "../../Domain/Entities/DocuFile"
import { SharedDocuFileNotFound } from "../../Domain/Exceptions/SharedDocuFileNotFound"
import { SharedToken } from "../../Domain/VOs/ShareToken"

export class GetDocuFileBySharedToken {

    constructor(
        private docuFileRepository: DocuFileRepository,
    ) {}

    public async run({ sharedToken }: { sharedToken: string }): Promise<DocuFile> {
        const docuFile = await this.docuFileRepository.findBySharedToken(new SharedToken(sharedToken))
        if (!docuFile) {
            throw new SharedDocuFileNotFound(sharedToken)
        }

        return docuFile
    }
}