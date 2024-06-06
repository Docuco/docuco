import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../_shared/BaseController";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { DocuFilePrimitive } from "../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { DocuFile } from "../../../../_core/Documents/Domain/Entities/DocuFile";
import { GetDeletedDocuFiles } from "../../../../_core/Documents/Application/Queries/GetDeletedDocuFiles";
import { PermissionType } from "../../../../_core/Shared/Domain/VOs/Permission";
import { ProtectedController } from "../../_shared/ProtectedController";

export class GetDeletedDocuFilesController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['documents:read'];
    REQUIRED_PERMISSIONS: PermissionType[] = GetDeletedDocuFilesController.permissions;

    private getDocuFiles: GetDeletedDocuFiles

    constructor() {
        this.getDocuFiles = new GetDeletedDocuFiles(
            DIContainer.get('DocuFileRepository')
        )
    }

    async run(
        req: NextRequest,
    ): Promise<NextResponse> {
        const docuFiles = await this.getDocuFiles.run()

        const files = this.mapResponse(docuFiles)

        return NextResponse.json({
            files
        }, { status: 200 });
    }

    private mapResponse(docuFiles: DocuFile[]): DocuFilePrimitive[] {
        return docuFiles.map(docuFile => docuFile.toPrimitives())
    }
}
