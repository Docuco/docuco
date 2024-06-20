import { FolderPrimitive } from "../../Domain/Primitives/FolderPrimitive";

type PropsToOmit = 'id' | 'isDeleted' | 'sharedToken' | 'createdAt' | 'updatedAt';
export interface CreateFolderDTO extends Omit<FolderPrimitive, PropsToOmit> {
}
