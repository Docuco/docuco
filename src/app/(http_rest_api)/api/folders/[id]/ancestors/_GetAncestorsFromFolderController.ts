import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../../_shared/BaseController";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { ProtectedController } from "../../../_shared/ProtectedController";
import { PermissionType } from "../../../../../_core/Shared/Domain/VOs/Permission";
import { z } from "zod";
import { DocuFile } from "../../../../../_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitive } from "../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { GetAncestorsFromFolder } from "../../../../../_core/Folders/Application/Queries/GetAncestorsFromFolder";

const schema = z.object({
    id: z.string(),
})

export class GetAncestorsFromFolderController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['folders:read'];
    REQUIRED_PERMISSIONS: PermissionType[] = GetAncestorsFromFolderController.permissions;

    private getAncestorsFromFolder: GetAncestorsFromFolder

    constructor() {
        this.getAncestorsFromFolder = new GetAncestorsFromFolder(
            DIContainer.get('FolderRepository'),
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { id } = this.getParams(req, pathParams)

        const ancestors = await this.getAncestorsFromFolder.run({ id })

        return NextResponse.json({ ancestors }, { status: 200 });
    }

    private getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            id: pathParams.id,
        })
    }
}
