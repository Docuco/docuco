import { Id } from "../../../Shared/Domain/VOs/Id"
import { Folder } from "../Entities/Folder";
import { FolderNotFound } from "../Exceptions/FolderNotFound";
import { FolderRepository } from "../Repositories/FolderRepository";

export class FolderFinder {

    constructor(
        private folderRepository: FolderRepository,
    ) {}

    public async run(id: Id): Promise<Folder> {
        const folderOption = await this.folderRepository.findById(id)
        const folder = folderOption.getOrThrow(new FolderNotFound(id.value))

        return folder
    }
}