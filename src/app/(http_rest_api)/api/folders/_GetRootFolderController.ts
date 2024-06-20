import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../_shared/BaseController";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { ProtectedController } from "../_shared/ProtectedController";
import { PermissionType } from "../../../_core/Shared/Domain/VOs/Permission";
import { GetFoldersInParent } from "../../../_core/Folders/Application/Queries/GetFoldersInParent";
import { Folder } from "../../../_core/Folders/Domain/Entities/Folder";
import { FolderPrimitive } from "../../../_core/Folders/Domain/Primitives/FolderPrimitive";

export class GetRootFolderController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['folders:read'];
    REQUIRED_PERMISSIONS: PermissionType[] = GetRootFolderController.permissions;

    private getFoldersInParent: GetFoldersInParent

    constructor() {
        this.getFoldersInParent = new GetFoldersInParent(
            DIContainer.get('FolderRepository'),
        )
    }

    async run(
        req: NextRequest,
    ): Promise<NextResponse> {
        const folders = await this.getFoldersInParent.run(null)
        const foldersResponse = this.mapResponse(folders)

        return NextResponse.json({ folders: foldersResponse }, { status: 200 });
    }

    private mapResponse(folders: Folder[]): FolderPrimitive[] {
        return folders.map(folder => folder.toPrimitives())
    }
}
