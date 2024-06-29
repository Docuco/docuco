import { Folder } from "../Entities/Folder";
import { FolderRepository } from "../Repositories/FolderRepository";
import { FolderDeleter } from "../Services/FolderDeleter";

export class FolderDeleterByParent {

    constructor(
        private folderRepository: FolderRepository,
        private folderDeleter: FolderDeleter,
    ) {}

    public async run(parentFolder: Folder): Promise<void> {
        const folders = await this.folderRepository.findByParent(parentFolder)
        
        await Promise.all(folders.map(folder => this.folderDeleter.run(folder)))
    }
}