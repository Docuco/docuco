export interface FolderPrimitive {
    id: string;
    name: string;
    parentFolderId: string | null;
    isDeleted: boolean;
    createdAt: number;
    updatedAt: number;
}