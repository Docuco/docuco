import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../../_shared/BaseController";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { ProtectedController } from "../../../_shared/ProtectedController";
import { Permission, PermissionType } from "../../../../../_core/Shared/Domain/VOs/Permission";
import { ApiKeyFinder } from "../../../../../_core/Auth/Domain/Services/ApiKeyFinder";
import { z } from "zod";
import { ChangeApiKeyPermissions } from "../../../../../_core/Auth/Application/Commands/ChangeApiKeyPermissions";

const schema = z.object({
    apiKey: z.string(),
    newPermissions: z.enum(Permission.ValidValues).array(),
})

export class ChangeApiKeyPermissionsController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['apikey:change:permission'];
    REQUIRED_PERMISSIONS: PermissionType[] = ChangeApiKeyPermissionsController.permissions;

    private changeApiKeyPermissions: ChangeApiKeyPermissions

    constructor() {
        const apiKeyRepository = DIContainer.get('ApiKeyRepository')
        const eventBus = DIContainer.get('EventBus')
        
        const apiKeyFinder = new ApiKeyFinder(
            apiKeyRepository,
        )

        this.changeApiKeyPermissions = new ChangeApiKeyPermissions(
            apiKeyFinder,
            apiKeyRepository,
            eventBus
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { apiKey, newPermissions } = await this.getParams(req, pathParams);

        await this.changeApiKeyPermissions.run({ apiKey, newPermissions })

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        const body = await req.json()

        return schema.parse({
            apiKey: pathParams.apiKey,
            newPermissions: body.permissions,
        })
    }
}
