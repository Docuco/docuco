import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../_shared/BaseController";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { GetDocuFiles } from "../../../_core/Documents/Application/Queries/GetDocuFiles";
import { DocuFile } from "../../../_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitive } from "../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";

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
        const docuFiles = await this.getDocuFiles.run()

        const files = this.mapResponse(docuFiles)

        return NextResponse.json({
            files
        }, { status: 200 });
    }

    private mapResponse(docuFiles: DocuFile[]): DocuFilePrimitive[] {
        return docuFiles.map(docuFile => docuFile.toPrimitives())
    }
}
