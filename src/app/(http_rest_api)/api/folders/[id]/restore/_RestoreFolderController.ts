import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../../_shared/BaseController";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { z } from "zod";
import { ProtectedController } from "../../../_shared/ProtectedController";
import { PermissionType } from "../../../../../_core/Shared/Domain/VOs/Permission";
import { RestoreFolder } from "../../../../../_core/Folders/Application/Commands/RestoreFolder";
import { FolderFinder } from "../../../../../_core/Folders/Domain/Services/FolderFinder";

const schema = z.object({
    id: z.string()
})

export class RestoreFolderController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['folders:restore'];
    REQUIRED_PERMISSIONS: PermissionType[] = RestoreFolderController.permissions;

    private restoreFolder: RestoreFolder

    constructor() {
        const folderRepository = DIContainer.get('FolderRepository')
        const eventBus = DIContainer.get('EventBus')

        this.restoreFolder = new RestoreFolder(
            new FolderFinder(folderRepository),
            folderRepository,
            eventBus
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { id } = await this.getParams(req, pathParams);

        await this.restoreFolder.run({ id })

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            id: pathParams.id
        })
    }
}
