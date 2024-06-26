import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../_shared/BaseController";
import { z } from "zod";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { ProtectedController } from "../_shared/ProtectedController";
import { PermissionType } from "../../../_core/Shared/Domain/VOs/Permission";
import { CreateFolder } from "../../../_core/Folders/Application/Commands/CreateFolder";

const schema = z.object({
    name: z.string(),
    parentFolderId: z.string().nullable(),
})

export class CreateFolderController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['folders:create'];
    REQUIRED_PERMISSIONS: PermissionType[] = CreateFolderController.permissions;

    private createFolder: CreateFolder

    constructor() {
        this.createFolder = new CreateFolder(
            DIContainer.get('FolderRepository'),
            DIContainer.get('EventBus')
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { name, parentFolderId } = await this.getParams(req);

        await this.createFolder.run({
            name,
            parentFolderId
        })

        return NextResponse.json({}, { status: 201 });
    }

    private async getParams(req: NextRequest) {
        const body = await req.json()

        return schema.parse({
            name: body.name,
            parentFolderId: body.parentFolderId,
        })
    }
}
