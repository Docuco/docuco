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

    public async run(folderParentId: string | null): Promise<Folder[]> {
        if (folderParentId) {
            const folderParent = await this.folderFinder.run(folderParentId)
            if (folderParent.isDeleted) {
                throw new FolderNotFound(folderParentId)
            }
        }

        return this.folderRespository.getAll({
            folderParentId: Option.fromValue(folderParentId).map(id => new Id(id))
        })
    }
}