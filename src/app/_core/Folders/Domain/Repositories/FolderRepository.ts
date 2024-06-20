import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { Folder } from "../Entities/Folder";

export interface FolderRepository {
    getAll({ folderParentId }: { folderParentId: Option<Id> }): Promise<Folder[]>;
    save(folder: Folder): Promise<void>;
    findById(id: Id): Promise<Option<Folder>>;
}