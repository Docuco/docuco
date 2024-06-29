import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { DocuFile } from "../Entities/DocuFile";
import { DocuFileFilters } from "../VOs/DocuFileFilters";
import { SharedToken } from "../../../Shared/Domain/VOs/ShareToken";
import { Folder } from "../../../Folders/Domain/Entities/Folder";

export interface DocuFileRepository {
    save(document: DocuFile): Promise<void>;
    getAll({ parentFolderId, filters }: { parentFolderId: Option<Id>, filters: Option<DocuFileFilters> }): Promise<DocuFile[]>;
    getDeleted({ parentFolderId }: { parentFolderId: Option<Id> }): Promise<DocuFile[]>;
    findById(id: Id): Promise<Option<DocuFile>>;
    findByParent(parentFolder: Folder): Promise<DocuFile[]>;
    delete(document: DocuFile): Promise<void>;
    findBySharedToken(sharedToken: SharedToken): Promise<Option<DocuFile>>;
}