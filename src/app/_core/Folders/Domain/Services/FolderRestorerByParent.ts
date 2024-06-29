import { FolderRestorer } from "../Services/FolderRestorer";
import { FolderRepository } from "../Repositories/FolderRepository";
import { Folder } from "../Entities/Folder";

export class FolderRestorerByParent {

    constructor(
        private folderRepository: FolderRepository,
        private folderRestorer: FolderRestorer,
    ) {}

    public async run(parentFolder: Folder): Promise<void> {
        const folders = await this.folderRepository.findByParent(parentFolder)
        
        await Promise.all(folders.map(folder => this.folderRestorer.run(folder)))
    }
}