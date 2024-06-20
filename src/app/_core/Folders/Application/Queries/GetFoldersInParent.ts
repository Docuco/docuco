import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { Folder } from "../../Domain/Entities/Folder";
import { FolderRepository } from "../../Domain/Repositories/FolderRepository";

export class GetFoldersInParent {

    constructor(
        private folderRespository: FolderRepository,
    ) { }

    public async run(folderParentId: string | null ): Promise<Folder[]> {
        return this.folderRespository.getAll({
            folderParentId: Option.fromValue(folderParentId).map(id => new Id(id))
        })
    }
}