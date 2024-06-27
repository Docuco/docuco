import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../_shared/BaseController";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { ProtectedController } from "../_shared/ProtectedController";
import { PermissionType } from "../../../_core/Shared/Domain/VOs/Permission";
import { GetFoldersInParent } from "../../../_core/Folders/Application/Queries/GetFoldersInParent";
import { Folder } from "../../../_core/Folders/Domain/Entities/Folder";
import { FolderPrimitive } from "../../../_core/Folders/Domain/Primitives/FolderPrimitive";
import { FolderFinder } from "../../../_core/Folders/Domain/Services/FolderFinder";

export class GetRootFolderController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['folders:read'];
    REQUIRED_PERMISSIONS: PermissionType[] = GetRootFolderController.permissions;

    private getFoldersInParent: GetFoldersInParent

    constructor() {
        const folderFinder = new FolderFinder(
            DIContainer.get('FolderRepository'),
        )

        this.getFoldersInParent = new GetFoldersInParent(
            folderFinder,
            DIContainer.get('FolderRepository'),
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const folders = await this.getFoldersInParent.run(null)
        const foldersResponse = this.mapResponse(folders)

        return NextResponse.json({ folders: foldersResponse }, { status: 200 });
    }

    private mapResponse(folders: Folder[]): FolderPrimitive[] {
        return folders.map(folder => folder.toPrimitives())
    }
}
