import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { DocuFile } from "../Entities/DocuFile";
import { DocuFileFilters } from "../VOs/DocuFileFilters";
import { SharedToken } from "../VOs/ShareToken";

export interface DocuFileRepository {
    save(document: DocuFile): Promise<void>;
    getAll({ filters }: { filters: Option<DocuFileFilters> }): Promise<DocuFile[]>;
    getDeleted(): Promise<DocuFile[]>;
    findById(id: Id): Promise<Option<DocuFile>>;
    delete(document: DocuFile): Promise<void>;
    findBySharedToken(sharedToken: SharedToken): Promise<Option<DocuFile>>;
}