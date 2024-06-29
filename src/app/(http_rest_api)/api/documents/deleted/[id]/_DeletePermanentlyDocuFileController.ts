import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../../_shared/BaseController";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { DocuFileFinder } from "../../../../../_core/Documents/Domain/Services/DocuFileFinder";
import { z } from "zod";
import { DeletePermanentlyDocuFile } from "../../../../../_core/Documents/Application/Commands/DeletePermanentlyDocuFile";
import { ProtectedController } from "../../../_shared/ProtectedController";
import { PermissionType } from "../../../../../_core/Shared/Domain/VOs/Permission";
import { DocuFileDeleterPermanently } from "../../../../../_core/Documents/Domain/Services/DocuFileDeleterPermanently";

const schema = z.object({
    id: z.string()
})

export class DeletePermanentlyDocuFileController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['documents:delete'];
    REQUIRED_PERMISSIONS: PermissionType[] = DeletePermanentlyDocuFileController.permissions;

    private deletePermanentlyDocuFile: DeletePermanentlyDocuFile

    constructor() {
        const docuFileRepository = DIContainer.get('DocuFileRepository')
        const eventBus = DIContainer.get('EventBus')

        this.deletePermanentlyDocuFile = new DeletePermanentlyDocuFile(
            new DocuFileFinder(docuFileRepository),
            new DocuFileDeleterPermanently(docuFileRepository, eventBus),
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { id } = await this.getParams(req, pathParams);

        await this.deletePermanentlyDocuFile.run({ id })

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            id: pathParams.id
        })
    }
}
