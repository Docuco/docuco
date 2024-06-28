import { DocuFileRepository } from "../../Domain/Repositories/DocuFileRepository"
import { DocuFile } from "../../Domain/Entities/DocuFile"
import { DocuFileFiltersPrimitives } from "../../Domain/Primitives/DocuFileFiltersPrimitives"
import { Option } from "../../../Shared/Domain/VOs/Option"
import { DocuFileFilters } from "../../Domain/VOs/DocuFileFilters"
import { FolderFinder } from "../../../Folders/Domain/Services/FolderFinder"
import { Id } from "../../../Shared/Domain/VOs/Id"
import { FolderNotFound } from "../../../Folders/Domain/Exceptions/FolderNotFound"

export class GetDocuFilesInFolder {

    constructor(
        private docuFileRepository: DocuFileRepository,
        private folderFinder: FolderFinder,
    ) {}

    public async run({
        folderParentId,
        filters
    }: {
        folderParentId: string | null,
        filters?: DocuFileFiltersPrimitives
    }): Promise<DocuFile[]> {
        if (folderParentId) {
            const folderParent = await this.folderFinder.run(folderParentId)
            if (folderParent.isDeleted) {
                throw new FolderNotFound(folderParentId)
            }
        }

        return this.docuFileRepository.getAll({
            folderParentId: Option.fromValue(folderParentId).map(value => new Id(value)),
            filters: Option.fromValue(filters).map(f => DocuFileFilters.fromPrimitives(f))
        })
    }
}