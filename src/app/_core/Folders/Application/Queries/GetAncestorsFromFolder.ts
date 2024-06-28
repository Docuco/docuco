import { Id } from "../../../Shared/Domain/VOs/Id";
import { FolderNotFound } from "../../Domain/Exceptions/FolderNotFound";
import { FolderRepository } from "../../Domain/Repositories/FolderRepository";
import { FolderAncestorsDTO } from "../DTOs/FolderAncestorsDTO";

export class GetAncestorsFromFolder {

    constructor(
        private folderRespository: FolderRepository,
    ) { }

    public async run({ id }: { id: string }): Promise<FolderAncestorsDTO> {
        const ancestors = await this.folderRespository.getAncestors(new Id(id))
        if (ancestors.isNone()) {
            throw new FolderNotFound(id)
        }

        return ancestors.get()
    }
}