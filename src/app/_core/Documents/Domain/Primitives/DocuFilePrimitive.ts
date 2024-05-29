import { DocuMimeTypeType } from "../VOs/DocuMimeType";

export interface DocuFilePrimitive {
    id: string;
    name: string,
    mimeType: DocuMimeTypeType,
    sizeInBytes: number,
    extension: string | null,
    url: string;
    isDeleted: boolean;
    sharedToken: string | null;
    createdAt: number;
    updatedAt: number;
}