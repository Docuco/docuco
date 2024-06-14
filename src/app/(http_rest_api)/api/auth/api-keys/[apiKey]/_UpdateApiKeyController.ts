import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../../_shared/BaseController";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { ProtectedController } from "../../../_shared/ProtectedController";
import { PermissionType } from "../../../../../_core/Shared/Domain/VOs/Permission";
import { ApiKeyFinder } from "../../../../../_core/Auth/Domain/Services/ApiKeyFinder";
import { z } from "zod";
import { UpdateApiKey } from "../../../../../_core/Auth/Application/Commands/UpdateApiKey";

const schema = z.object({
    apiKeyValue: z.string(),
    apiKeyData: z.object({
        name: z.string(),
        description: z.string().nullable(),
    }),
})

export class UpdateApiKeyController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['apikey:update'];
    REQUIRED_PERMISSIONS: PermissionType[] = UpdateApiKeyController.permissions;

    private updateApiKey: UpdateApiKey

    constructor() {
        const apiKeyRepository = DIContainer.get('ApiKeyRepository')
        const eventBus = DIContainer.get('EventBus')
        
        const apiKeyFinder = new ApiKeyFinder(
            apiKeyRepository,
        )

        this.updateApiKey = new UpdateApiKey(
            apiKeyFinder,
            apiKeyRepository,
            eventBus
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { apiKeyValue, apiKeyData } = await this.getParams(req, pathParams);

        await this.updateApiKey.run({ apiKeyValue, apiKeyData })

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        const body = await req.json()

        return schema.parse({
            apiKeyValue: pathParams.apiKey,
            apiKeyData: {
                name: body.name,
                description: body.description,
            }
        })
    }
}
