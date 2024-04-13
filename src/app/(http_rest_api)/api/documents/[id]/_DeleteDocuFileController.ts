import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../_shared/BaseController";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { DeleteDocuFile } from "../../../../_core/Documents/Application/Commands/DeleteDocuFile";
import { DocuFileFinder } from "../../../../_core/Documents/Domain/Services/DocuFileFinder";
import { z } from "zod";

const schema = z.object({
    id: z.string()
})

export class DeleteDocuFileController extends BaseController {
    private deleteDocuFile: DeleteDocuFile

    constructor() {
        super();
        const docuFileRepository = DIContainer.get('DocuFileRepository')
        const eventBus = DIContainer.get('EventBus')

        this.deleteDocuFile = new DeleteDocuFile(
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

        await this.deleteDocuFile.run(id)

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            id: pathParams.id
        })
    }
}
