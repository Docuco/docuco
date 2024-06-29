import { DocuFileRepository } from "../../Domain/Repositories/DocuFileRepository"
import { DocuFile } from "../../Domain/Entities/DocuFile"
import { Option } from "../../../Shared/Domain/VOs/Option"
import { Id } from "../../../Shared/Domain/VOs/Id"

export class GetDeletedDocuFiles {

    constructor(
        private docuFileRepository: DocuFileRepository,
    ) {}

    public async run(parentFolderId: string | null): Promise<DocuFile[]> {
        return this.docuFileRepository.getDeleted({
            parentFolderId: Option.fromValue(parentFolderId).map(id => new Id(id))
        })
    }
}