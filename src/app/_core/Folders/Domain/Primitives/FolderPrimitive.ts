export interface FolderPrimitive {
    id: string;
    name: string;
    folderParentId: string | null;
    isDeleted: boolean;
    createdAt: number;
    updatedAt: number;
}