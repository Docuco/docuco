import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { Folder } from "../../Domain/Entities/Folder";
import { FolderNotFound } from "../../Domain/Exceptions/FolderNotFound";
import { FolderRepository } from "../../Domain/Repositories/FolderRepository";
import { FolderFinder } from "../../Domain/Services/FolderFinder";

export class GetFoldersInParent {

    constructor(
        private folderFinder: FolderFinder,
        private folderRespository: FolderRepository,
    ) { }

    public async run(parentFolderId: string | null): Promise<Folder[]> {
        if (parentFolderId) {
            const parentFolder = await this.folderFinder.run(new Id(parentFolderId))
            if (parentFolder.isDeleted) {
                throw new FolderNotFound(parentFolderId)
            }
        }

        return this.folderRespository.getAll({
            parentFolderId: Option.fromValue(parentFolderId).map(id => new Id(id))
        })
    }
}