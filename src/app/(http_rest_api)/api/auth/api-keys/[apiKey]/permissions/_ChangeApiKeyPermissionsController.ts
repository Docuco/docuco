import { NextRequest, NextResponse } from "next/server"
import { z } from "zod";
import { Permission, PermissionType } from "../../../../../../_core/Shared/Domain/VOs/Permission";
import { BaseController } from "../../../../_shared/BaseController";
import { ProtectedController } from "../../../../_shared/ProtectedController";
import { ChangeApiKeyPermissions } from "../../../../../../_core/Auth/Application/Commands/ChangeApiKeyPermissions";
import { DIContainer } from "../../../../../../_core/Shared/Infrastructure/DIContainer";
import { ApiKeyFinder } from "../../../../../../_core/Auth/Domain/Services/ApiKeyFinder";

const schema = z.object({
    apiKey: z.string(),
    newPermissions: z.enum(Permission.ValidValues).array(),
})

export class ChangeApiKeyPermissionsController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['api_key:change_permissions'];
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
