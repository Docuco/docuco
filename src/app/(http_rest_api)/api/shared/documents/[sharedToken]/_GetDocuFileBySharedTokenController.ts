import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../../_shared/BaseController";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { z } from "zod";
import { GetDocuFileBySharedToken } from "../../../../../_core/Documents/Application/Queries/GetDocuFileBySharedToken";
import { DocuFile } from "../../../../../_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitive } from "../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";

const schema = z.object({
    sharedToken: z.string()
})

export class GetDocuFileBySharedTokenController implements BaseController {
    private getDocuFileBySharedToken: GetDocuFileBySharedToken

    constructor() {
        const docuFileRepository = DIContainer.get('DocuFileRepository')

        this.getDocuFileBySharedToken = new GetDocuFileBySharedToken(
            docuFileRepository,
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { sharedToken } = await this.getParams(req, pathParams);

        const docuFile = await this.getDocuFileBySharedToken.run({ sharedToken })

        const fileResponse = this.mapResponse(docuFile)
        return NextResponse.json(fileResponse, { status: 200 });
    }

    private mapResponse(docuFile: DocuFile): DocuFilePrimitive {
        return docuFile.toPrimitives()
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            sharedToken: pathParams.sharedToken
        })
    }
}
