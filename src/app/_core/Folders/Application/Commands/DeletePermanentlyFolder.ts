import { Id } from "../../../Shared/Domain/VOs/Id";
import { FolderDeleterPermanently } from "../../Domain/Services/FolderDeleterPermanently";
import { FolderFinder } from "../../Domain/Services/FolderFinder";

export class DeletePermanentlyFolder {

    constructor(
        private folderFinder: FolderFinder,
        private folderDeleterPermanently: FolderDeleterPermanently,
    ) {}

    public async run({ id }: { id: string }): Promise<void> {
        const folder = await this.folderFinder.run(new Id(id))

        await this.folderDeleterPermanently.run(folder)
    }
}