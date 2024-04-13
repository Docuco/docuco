import { ContentFile } from "../Entities/ContentFile";
import { DocuFile } from "../Entities/DocuFile";

export interface ContentFileStore {
    upload(contentFile: ContentFile): Promise<{file: ContentFile, url: string}>;
    delete(docuFile: DocuFile): Promise<void>;
}