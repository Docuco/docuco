import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { DocuFile } from "../Entities/DocuFile";
import { DocuFileFilters } from "../VOs/DocuFileFilters";
import { SharedToken } from "../../../Shared/Domain/VOs/ShareToken";

export interface DocuFileRepository {
    save(document: DocuFile): Promise<void>;
    getAll({ folderParentId, filters }: { folderParentId: Option<Id>, filters: Option<DocuFileFilters> }): Promise<DocuFile[]>;
    getDeleted(): Promise<DocuFile[]>;
    findById(id: Id): Promise<Option<DocuFile>>;
    delete(document: DocuFile): Promise<void>;
    findBySharedToken(sharedToken: SharedToken): Promise<Option<DocuFile>>;
}