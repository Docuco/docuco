import { Id } from "../../../Shared/VOs/Id";
import { DocuFile } from "../Entities/DocuFile";

export interface DocuFileRepository {
    save(document: DocuFile): Promise<void>;
    getAll(): Promise<DocuFile[]>;
    getDeleted(): Promise<DocuFile[]>;
    find(id: Id): Promise<DocuFile | null>;
    delete(document: DocuFile): Promise<void>;
}