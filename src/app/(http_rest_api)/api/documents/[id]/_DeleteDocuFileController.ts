import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../_shared/BaseController";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { DeleteDocuFile } from "../../../../_core/Documents/Application/Commands/DeleteDocuFile";
import { DocuFileFinder } from "../../../../_core/Documents/Domain/Services/DocuFileFinder";
import { z } from "zod";
import { PermissionType } from "../../../../_core/Shared/Domain/VOs/Permission";
import { ProtectedController } from "../../_shared/ProtectedController";
import { DocuFileDeleter } from "../../../../_core/Documents/Domain/Services/DocuFileDeleter";

const schema = z.object({
    id: z.string()
})

export class DeleteDocuFileController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['documents:delete'];
    REQUIRED_PERMISSIONS: PermissionType[] = DeleteDocuFileController.permissions;

    private deleteDocuFile: DeleteDocuFile

    constructor() {
        const docuFileRepository = DIContainer.get('DocuFileRepository')
        const eventBus = DIContainer.get('EventBus')

        this.deleteDocuFile = new DeleteDocuFile(
            new DocuFileFinder(docuFileRepository),
            new DocuFileDeleter(docuFileRepository, eventBus),
            eventBus
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { id } = await this.getParams(req, pathParams);

        await this.deleteDocuFile.run({id})

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            id: pathParams.id
        })
    }
}
