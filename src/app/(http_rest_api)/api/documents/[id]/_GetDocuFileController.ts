import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../_shared/BaseController";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { DocuFileFinder } from "../../../../_core/Documents/Domain/Services/DocuFileFinder";
import { z } from "zod";
import { GetDocuFile } from "../../../../_core/Documents/Application/Queries/GetDocuFile";
import { DocuFile } from "../../../../_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitive } from "../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";

const schema = z.object({
    id: z.string()
})

export class GetDocuFileController extends BaseController {
    private getDocuFile: GetDocuFile

    constructor() {
        super();
        const docuFileRepository = DIContainer.get('DocuFileRepository')

        const docuFileFinder = new DocuFileFinder(docuFileRepository)

        this.getDocuFile = new GetDocuFile(
            docuFileFinder
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { id } = await this.getParams(req, pathParams);

        const docuFile = await this.getDocuFile.run({id})

        const fileResponse = this.mapResponse(docuFile)
        return NextResponse.json(fileResponse, { status: 200 });
    }

    private mapResponse(docuFile: DocuFile): DocuFilePrimitive {
        return docuFile.toPrimitives()
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            id: pathParams.id
        })
    }
}
