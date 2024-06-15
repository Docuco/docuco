import { NextRequest, NextResponse } from "next/server"
import { z } from "zod";
import { PermissionType } from "../../../../../../_core/Shared/Domain/VOs/Permission";
import { BaseController } from "../../../../_shared/BaseController";
import { ProtectedController } from "../../../../_shared/ProtectedController";
import { DIContainer } from "../../../../../../_core/Shared/Infrastructure/DIContainer";
import { ApiKeyFinder } from "../../../../../../_core/Auth/Domain/Services/ApiKeyFinder";
import { RegenerateApiKey } from "../../../../../../_core/Auth/Application/Commands/RegenerateApiKey";

const schema = z.object({
    apiKey: z.string(),
})

export class RegenerateApiKeyController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['api_key:regenerate'];
    REQUIRED_PERMISSIONS: PermissionType[] = RegenerateApiKeyController.permissions;

    private regenerateApiKey: RegenerateApiKey

    constructor() {
        const apiKeyRepository = DIContainer.get('ApiKeyRepository')
        const eventBus = DIContainer.get('EventBus')
        
        const apiKeyFinder = new ApiKeyFinder(
            apiKeyRepository,
        )

        this.regenerateApiKey = new RegenerateApiKey(
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

        await this.regenerateApiKey.run(apiKey)

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            apiKey: pathParams.apiKey,
        })
    }
}
