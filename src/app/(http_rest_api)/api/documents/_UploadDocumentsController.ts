import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../_shared/BaseController";
import { z } from "zod";
import { ContentFileUploader } from "../../../_core/Documents/Domain/Services/ContentFileUploader";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { UploadDocuments } from "../../../_core/Documents/Application/Commands/UploadDocuments";
import { ProtectedController } from "../_shared/ProtectedController";
import { PermissionType } from "../../../_core/Shared/Domain/VOs/Permission";

const schema = z.object({
    files: z.array(z.instanceof(File))
})

export class UploadDocumentsController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['documents:upload'];
    REQUIRED_PERMISSIONS: PermissionType[] = UploadDocumentsController.permissions;

    private uploadDocuments: UploadDocuments

    constructor() {
        const contentFileUploader = new ContentFileUploader(
            DIContainer.get('ContentFileStore'),
            DIContainer.get('EventBus')
        )

        this.uploadDocuments = new UploadDocuments(
            contentFileUploader
        )
    }

    async run(
        req: NextRequest,
    ): Promise<NextResponse> {
        const { files } = await this.getParams(req);

        await this.uploadDocuments.run({
            files
        })

        return NextResponse.json({}, { status: 201 });
    }

    private async getParams(req: NextRequest) {
        const formData = await req.formData()

        return schema.parse({
            files: formData.getAll('documents[]')
        })
    }
}
