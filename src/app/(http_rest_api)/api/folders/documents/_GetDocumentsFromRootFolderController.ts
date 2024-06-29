import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../_shared/BaseController";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { ProtectedController } from "../../_shared/ProtectedController";
import { PermissionType } from "../../../../_core/Shared/Domain/VOs/Permission";
import { DocuFile } from "../../../../_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitive } from "../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { GetDocuFilesInFolder } from "../../../../_core/Documents/Application/Queries/GetDocuFilesInFolder";
import { FolderFinder } from "../../../../_core/Folders/Domain/Services/FolderFinder";
import { z } from "zod";
import { DocuFileFiltersPrimitives } from "../../../../_core/Documents/Domain/Primitives/DocuFileFiltersPrimitives";

const schema = z.object({
    filters: z.object({
        mimeType: z.string().optional()
    })
})

export class GetDocumentsFromRootFolderController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['documents:read'];
    REQUIRED_PERMISSIONS: PermissionType[] = GetDocumentsFromRootFolderController.permissions;

    private getDocuFilesInFolder: GetDocuFilesInFolder

    constructor() {
        const folderFinder = new FolderFinder(
            DIContainer.get('FolderRepository'),
        )

        this.getDocuFilesInFolder = new GetDocuFilesInFolder(
            DIContainer.get('DocuFileRepository'),
            folderFinder,
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
     ): Promise<NextResponse> {
        const { filters } = this.getParams(req)

        const files = await this.getDocuFilesInFolder.run({ parentFolderId: null, filters })
        const filesResponse = this.mapResponse(files)

        return NextResponse.json({ files: filesResponse }, { status: 200 });
    }

    private mapResponse(files: DocuFile[]): DocuFilePrimitive[] {
        return files.map(file => file.toPrimitives())
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
