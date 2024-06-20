export interface FolderPrimitive {
    id: string;
    name: string;
    folderParentId: string | null;
    isDeleted: boolean;
    sharedToken: string | null;
    createdAt: number;
    updatedAt: number;
}