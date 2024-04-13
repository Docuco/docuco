export interface DocuFilePrimitive {
    id: string;
    name: string,
    mimeType: string,
    sizeInBytes: number,
    extension: string | null,
    url: string;
    isDeleted: boolean;
    createdAt: number;
    updatedAt: number;
}