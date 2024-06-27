import { NextRequest, NextResponse } from "next/server"
import { GetDeletedDocuFiles } from "../../../../../../_core/Documents/Application/Queries/GetDeletedDocuFiles";
import { DIContainer } from "../../../../../../_core/Shared/Infrastructure/DIContainer";
import { PermissionType } from "../../../../../../_core/Shared/Domain/VOs/Permission";
import { BaseController } from "../../../../_shared/BaseController";
import { ProtectedController } from "../../../../_shared/ProtectedController";
import { DocuFilePrimitive } from "../../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { DocuFile } from "../../../../../../_core/Documents/Domain/Entities/DocuFile";
import { z } from "zod";

const schema = z.object({
    folderParentId: z.string(),
})

export class GetDeletedDocuFilesByParentController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['documents:read'];
    REQUIRED_PERMISSIONS: PermissionType[] = GetDeletedDocuFilesByParentController.permissions;

    private getDeletedDocuFiles: GetDeletedDocuFiles

    constructor() {
        this.getDeletedDocuFiles = new GetDeletedDocuFiles(
            DIContainer.get('DocuFileRepository')
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { folderParentId } = this.getParams(req, pathParams)

        const docuFiles = await this.getDeletedDocuFiles.run(folderParentId)

        const files = this.mapResponse(docuFiles)

        return NextResponse.json({
            files
        }, { status: 200 });
    }

    private mapResponse(docuFiles: DocuFile[]): DocuFilePrimitive[] {
        return docuFiles.map(docuFile => docuFile.toPrimitives())
    }

    private getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            folderParentId: pathParams.id,
        })
    }
}
