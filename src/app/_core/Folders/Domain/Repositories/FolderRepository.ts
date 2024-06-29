import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { FolderAncestorsDTO } from "../../Application/DTOs/FolderAncestorsDTO";
import { Folder } from "../Entities/Folder";

export interface FolderRepository {
    getAll({ parentFolderId }: { parentFolderId: Option<Id> }): Promise<Folder[]>;
    getDeleted({ parentFolderId }: { parentFolderId: Option<Id> }): Promise<Folder[]>
    save(folder: Folder): Promise<void>;
    findById(id: Id): Promise<Option<Folder>>;
    findByParent(parentFolder: Folder): Promise<Folder[]>;
    getAncestors(id: Id): Promise<Option<FolderAncestorsDTO>>;
    delete(folder: Folder): Promise<void>;
}