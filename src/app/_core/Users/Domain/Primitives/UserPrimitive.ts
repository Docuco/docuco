import { PermissionType } from "../../../Shared/Domain/VOs/Permission";

export interface UserPrimitive {
    id: string;
    email: string;
    permissions: PermissionType[];
    createdAt: number;
    updatedAt: number;
}