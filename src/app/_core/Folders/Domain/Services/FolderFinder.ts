import { Id } from "../../../Shared/Domain/VOs/Id"
import { Folder } from "../Entities/Folder";
import { FolderNotFound } from "../Exceptions/FolderNotFound";
import { FolderRepository } from "../Repositories/FolderRepository";

export class FolderFinder {

    constructor(
        private folderRepository: FolderRepository,
    ) {}

    public async run(id: string): Promise<Folder> {
        const folderOption = await this.folderRepository.findById(new Id(id))
        const folder = folderOption.getOrThrow(new FolderNotFound(id))

        return folder
    }
}