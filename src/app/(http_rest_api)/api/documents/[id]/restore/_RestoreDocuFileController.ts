import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../../_shared/BaseController";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { DocuFileFinder } from "../../../../../_core/Documents/Domain/Services/DocuFileFinder";
import { z } from "zod";
import { RestoreDocuFile } from "../../../../../_core/Documents/Application/Commands/RestoreDocuFile";
import { ProtectedController } from "../../../_shared/ProtectedController";
import { PermissionType } from "../../../../../_core/Shared/Domain/VOs/Permission";
import { DocuFileRestorer } from "../../../../../_core/Documents/Domain/Services/DocuFileRestorer";

const schema = z.object({
    id: z.string()
})

export class RestoreDocuFileController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['documents:restore'];
    REQUIRED_PERMISSIONS: PermissionType[] = RestoreDocuFileController.permissions;

    private restoreDocuFile: RestoreDocuFile

    constructor() {
        const docuFileRepository = DIContainer.get('DocuFileRepository')
        const eventBus = DIContainer.get('EventBus')

        this.restoreDocuFile = new RestoreDocuFile(
            new DocuFileFinder(docuFileRepository),
            new DocuFileRestorer(docuFileRepository, eventBus),
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { id } = await this.getParams(req, pathParams);

        await this.restoreDocuFile.run({ id })

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            id: pathParams.id
        })
    }
}
