import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../../_shared/BaseController";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { ProtectedController } from "../../../_shared/ProtectedController";
import { PermissionType } from "../../../../../_core/Shared/Domain/VOs/Permission";
import { DeleteApiKey } from "../../../../../_core/Auth/Application/Commands/DeleteApiKey";
import { ApiKeyFinder } from "../../../../../_core/Auth/Domain/Services/ApiKeyFinder";
import { z } from "zod";

const schema = z.object({
    apiKey: z.string(),
})

export class DeleteApiKeyController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['apikey:delete'];
    REQUIRED_PERMISSIONS: PermissionType[] = DeleteApiKeyController.permissions;

    private deleteApiKey: DeleteApiKey

    constructor() {
        const apiKeyRepository = DIContainer.get('ApiKeyRepository')
        const eventBus = DIContainer.get('EventBus')
        
        const apiKeyFinder = new ApiKeyFinder(
            apiKeyRepository,
        )

        this.deleteApiKey = new DeleteApiKey(
            apiKeyFinder,
            apiKeyRepository,
            eventBus
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { apiKey } = await this.getParams(req, pathParams);

        await this.deleteApiKey.run(apiKey)

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        const body = await req.json()

        return schema.parse({
            apiKey: pathParams.apiKey,
        })
    }
}
