import { FolderPrimitive } from "../../Domain/Primitives/FolderPrimitive";

export interface FolderAncestorsDTO extends FolderPrimitive{
    folderChildren: FolderAncestorsDTO | null;
}