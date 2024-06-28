import { NextRequest, NextResponse } from "next/server"
import { z } from "zod";
import { BaseController } from "../../_shared/BaseController";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { ProtectedController } from "../../_shared/ProtectedController";
import { Permission, PermissionType } from "../../../../_core/Shared/Domain/VOs/Permission";
import { CreateApiKey } from "../../../../_core/Auth/Application/Commands/CreateApiKey";

const schema = z.object({
    creatorId: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    permissions: z.enum(Permission.ValidValues).array(),
})

export class CreateApiKeyController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['api_key:create'];
    REQUIRED_PERMISSIONS: PermissionType[] = CreateApiKeyController.permissions;

    private createApiKey: CreateApiKey

    constructor() {
        const apiKeyRepository = DIContainer.get('ApiKeyRepository')
        const eventBus = DIContainer.get('EventBus')

        this.createApiKey = new CreateApiKey(
            apiKeyRepository,
            eventBus
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
     ): Promise<NextResponse> {
        const apiKey = await this.getParams(req);

        await this.createApiKey.run(apiKey)

        return NextResponse.json({}, { status: 201 });
    }

    private async getParams(req: NextRequest) {
        const body = await req.json()

        return schema.parse({
            creatorId: body.creatorId,
            name: body.name,
            description: body.description,
            permissions: body.permissions,
        })
    }
}
