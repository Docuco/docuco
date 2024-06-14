import { PermissionType } from "../../../Shared/Domain/VOs/Permission";

export interface ApiKeyPrimitive {
    creatorId: string;
    name: string;
    description: string | null;
    apiKeyValue: string;
    permissions: PermissionType[];
    createdAt: number;
    updatedAt: number;
}