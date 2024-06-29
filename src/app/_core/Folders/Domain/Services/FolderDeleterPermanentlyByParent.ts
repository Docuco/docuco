import { FolderDeleterPermanently } from "../Services/FolderDeleterPermanently";
import { FolderRepository } from "../Repositories/FolderRepository";
import { Folder } from "../Entities/Folder";

export class FolderDeleterPermanentlyByParent {

    constructor(
        private folderRepository: FolderRepository,
        private folderDeleterPermanently: FolderDeleterPermanently,
    ) {}

    public async run(parentFolder: Folder): Promise<void> {
        const folders = await this.folderRepository.findByParent(parentFolder)
        
        await Promise.all(folders.map(folder => this.folderDeleterPermanently.run(folder)))
    }
}