import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../_shared/BaseController";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { GetDocuFiles } from "../../../_core/Documents/Application/Queries/GetDocuFiles";
import { DocuFile } from "../../../_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitive } from "../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { DocuFileFiltersPrimitives } from "../../../_core/Documents/Domain/Primitives/DocuFileFiltersPrimitives";
import { z } from "zod";

const schema = z.object({
    filters: z.object({
        mimeType: z.string().optional()
    })
})

export class GetDocuFilesController extends BaseController {
    private getDocuFiles: GetDocuFiles

    constructor() {
        super();
        this.getDocuFiles = new GetDocuFiles(
            DIContainer.get('DocuFileRepository')
        )
    }

    async run(
        req: NextRequest,
    ): Promise<NextResponse> {
        const { filters } = this.getParams(req)
        
        const docuFiles = await this.getDocuFiles.run({ filters })

        const files = this.mapResponse(docuFiles)
        return NextResponse.json({
            files
        }, { status: 200 });
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
