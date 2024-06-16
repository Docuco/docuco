import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../_shared/BaseController";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { GetDocuFiles } from "../../../_core/Documents/Application/Queries/GetDocuFiles";
import { DocuFile } from "../../../_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitive } from "../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { DocuFileFiltersPrimitives } from "../../../_core/Documents/Domain/Primitives/DocuFileFiltersPrimitives";
import { z } from "zod";
import { ProtectedController } from "../_shared/ProtectedController";
import { PermissionType } from "../../../_core/Shared/Domain/VOs/Permission";

const schema = z.object({
    filters: z.object({
        mimeType: z.string().optional()
    })
})

export class GetDocuFilesController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['documents:read'];
    REQUIRED_PERMISSIONS: PermissionType[] = GetDocuFilesController.permissions;

    private getDocuFiles: GetDocuFiles

    constructor() {
        this.getDocuFiles = new GetDocuFiles(
            DIContainer.get('DocuFileRepository')
        )
    }

    async run(
        req: NextRequest,
    ): Promise<NextResponse> {
        const { filters } = this.getParams(req)
        
        const docuFiles = await this.getDocuFiles.run({ filters })

        const filesResponse = this.mapResponse(docuFiles)
        return NextResponse.json({ files: filesResponse }, { status: 200 });
    }

    private mapResponse(docuFiles: DocuFile[]): DocuFilePrimitive[] {
        return docuFiles.map(docuFile => docuFile.toPrimitives())
    }

    private getParams(req: NextRequest) {
        const { searchParams } = new URL(req.url);

        return schema.parse({
            filters: {
                mimeType: searchParams.has('mimeType') ? searchParams.get('mimeType') : undefined,
            }
        }) as {
            filters: DocuFileFiltersPrimitives
        }
    }
}
