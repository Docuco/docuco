import { PermissionType } from "../../../_core/Shared/Domain/VOs/Permission";

export interface ProtectedController {
    REQUIRED_PERMISSIONS: PermissionType[];
}
