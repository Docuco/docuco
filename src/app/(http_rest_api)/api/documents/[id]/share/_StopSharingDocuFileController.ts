import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../../_shared/BaseController";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { DocuFileFinder } from "../../../../../_core/Documents/Domain/Services/DocuFileFinder";
import { z } from "zod";
import { StopSharingDocuFile } from "../../../../../_core/Documents/Application/Commands/StopSharingDocuFile";

const schema = z.object({
    id: z.string()
})

export class StopSharingDocuFileController extends BaseController {
    private stopSharingDocuFile: StopSharingDocuFile

    constructor() {
        super();
        const docuFileRepository = DIContainer.get('DocuFileRepository')
        const eventBus = DIContainer.get('EventBus')

        this.stopSharingDocuFile = new StopSharingDocuFile(
            new DocuFileFinder(docuFileRepository),
            docuFileRepository,
            eventBus
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { id } = await this.getParams(req, pathParams);

        await this.stopSharingDocuFile.run({ id })

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            id: pathParams.id
        })
    }
}
