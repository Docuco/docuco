import { Option } from "../../../Shared/Domain/VOs/Option"
import { Id } from "../../../Shared/Domain/VOs/Id"
import { Folder } from "../../Domain/Entities/Folder"
import { FolderRepository } from "../../Domain/Repositories/FolderRepository"

export class GetDeletedFolders {

    constructor(
        private folderRepository: FolderRepository,
    ) {}

    public async run(folderParentId: string | null): Promise<Folder[]> {
        return this.folderRepository.getDeleted({
            folderParentId: Option.fromValue(folderParentId).map(id => new Id(id))
        })
    }
}