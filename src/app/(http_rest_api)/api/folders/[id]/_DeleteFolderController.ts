import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../_shared/BaseController";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { z } from "zod";
import { PermissionType } from "../../../../_core/Shared/Domain/VOs/Permission";
import { ProtectedController } from "../../_shared/ProtectedController";
import { FolderFinder } from "../../../../_core/Folders/Domain/Services/FolderFinder";
import { DeleteFolder } from "../../../../_core/Folders/Application/Commands/DeleteFolder";
import { FolderDeleter } from "../../../../_core/Folders/Domain/Services/FolderDeleter";

const schema = z.object({
    id: z.string()
})

export class DeleteFolderController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['folders:delete'];
    REQUIRED_PERMISSIONS: PermissionType[] = DeleteFolderController.permissions;

    private deleteFolder: DeleteFolder

    constructor() {
        const folderRepository = DIContainer.get('FolderRepository')
        const eventBus = DIContainer.get('EventBus')

        this.deleteFolder = new DeleteFolder(
            new FolderFinder(folderRepository),
            new FolderDeleter(folderRepository, eventBus),
            eventBus
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { id } = await this.getParams(req, pathParams);

        await this.deleteFolder.run({id})

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            id: pathParams.id
        })
    }
}
