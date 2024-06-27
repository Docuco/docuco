import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../_shared/BaseController";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { PermissionType } from "../../../../_core/Shared/Domain/VOs/Permission";
import { ProtectedController } from "../../_shared/ProtectedController";
import { Folder } from "../../../../_core/Folders/Domain/Entities/Folder";
import { FolderPrimitive } from "../../../../_core/Folders/Domain/Primitives/FolderPrimitive";
import { GetDeletedFolders } from "../../../../_core/Folders/Application/Queries/GetDeletedFolders";

export class GetRootDeletedFoldersController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['folders:read'];
    REQUIRED_PERMISSIONS: PermissionType[] = GetRootDeletedFoldersController.permissions;

    private getDeletedFolders: GetDeletedFolders

    constructor() {
        this.getDeletedFolders = new GetDeletedFolders(
            DIContainer.get('FolderRepository')
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
     ): Promise<NextResponse> {
        const folders = await this.getDeletedFolders.run(null)

        const foldersResponse = this.mapResponse(folders)

        return NextResponse.json({
            folders: foldersResponse 
        }, { status: 200 });
    }

    private mapResponse(folders: Folder[]): FolderPrimitive[] {
        return folders.map(folder => folder.toPrimitives())
    }
}
