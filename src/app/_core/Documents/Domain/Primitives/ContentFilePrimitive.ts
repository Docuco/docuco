import { DocuMimeTypeType } from "../VOs/DocuMimeType";

export interface ContentFilePrimitive {
    id: string,
    name: string,
    mimeType: DocuMimeTypeType,
    sizeInBytes: number,
    extension: string | null,
    content: Blob,
}