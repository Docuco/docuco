import { Option } from "../../../Shared/Domain/VOs/Option"
import { Id } from "../../../Shared/Domain/VOs/Id"
import { Folder } from "../../Domain/Entities/Folder"
import { FolderRepository } from "../../Domain/Repositories/FolderRepository"

export class GetDeletedFolders {

    constructor(
        private folderRepository: FolderRepository,
    ) {}

    public async run(parentFolderId: string | null): Promise<Folder[]> {
        return this.folderRepository.getDeleted({
            parentFolderId: Option.fromValue(parentFolderId).map(id => new Id(id))
        })
    }
}