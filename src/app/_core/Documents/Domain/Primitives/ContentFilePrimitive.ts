export interface ContentFilePrimitive {
    id: string,
    name: string,
    mimeType: string,
    sizeInBytes: number,
    extension: string | null,
    content: Blob,
}