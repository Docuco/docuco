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
        parentFolderId,
        filters
    }: {
        parentFolderId: string | null,
        filters?: DocuFileFiltersPrimitives
    }): Promise<DocuFile[]> {
        const docuFileFilters = Option.fromValue(filters).map(f => DocuFileFilters.fromPrimitives(f))
        
        if (!parentFolderId) {
            return this.docuFileRepository.getAll({
                parentFolderId: Option.none(),
                filters: docuFileFilters
            })
        }

        const parentFolder = await this.folderFinder.run(new Id(parentFolderId))
        if (parentFolder.isDeleted) {
            throw new FolderNotFound(parentFolderId)
        }

        return this.docuFileRepository.getAll({
            parentFolderId: Option.some(parentFolder.id),
            filters: docuFileFilters
        })
    }
}