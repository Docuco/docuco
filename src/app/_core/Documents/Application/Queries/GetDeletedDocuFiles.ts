import { DocuFileRepository } from "../../Domain/Repositories/DocuFileRepository"
import { DocuFile } from "../../Domain/Entities/DocuFile"
import { Option } from "../../../Shared/Domain/VOs/Option"
import { Id } from "../../../Shared/Domain/VOs/Id"

export class GetDeletedDocuFiles {

    constructor(
        private docuFileRepository: DocuFileRepository,
    ) {}

    public async run(folderParentId: string | null): Promise<DocuFile[]> {
        return this.docuFileRepository.getDeleted({
            folderParentId: Option.fromValue(folderParentId).map(id => new Id(id))
        })
    }
}