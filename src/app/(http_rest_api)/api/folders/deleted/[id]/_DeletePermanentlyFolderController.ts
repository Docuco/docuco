import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../../_shared/BaseController";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { z } from "zod";
import { ProtectedController } from "../../../_shared/ProtectedController";
import { PermissionType } from "../../../../../_core/Shared/Domain/VOs/Permission";
import { DeletePermanentlyFolder } from "../../../../../_core/Folders/Application/Commands/DeletePermanentlyFolder";
import { FolderFinder } from "../../../../../_core/Folders/Domain/Services/FolderFinder";
import { FolderDeleterPermanently } from "../../../../../_core/Folders/Domain/Services/FolderDeleterPermanently";

const schema = z.object({
    id: z.string()
})

export class DeletePermanentlyFolderController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['folders:delete'];
    REQUIRED_PERMISSIONS: PermissionType[] = DeletePermanentlyFolderController.permissions;

    private deletePermanentlyFolder: DeletePermanentlyFolder

    constructor() {
        const folderRepository = DIContainer.get('FolderRepository')
        const eventBus = DIContainer.get('EventBus')

        this.deletePermanentlyFolder = new DeletePermanentlyFolder(
            new FolderFinder(folderRepository),
            new FolderDeleterPermanently(folderRepository, eventBus),
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { id } = await this.getParams(req, pathParams);

        await this.deletePermanentlyFolder.run({ id })

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            id: pathParams.id
        })
    }
}
