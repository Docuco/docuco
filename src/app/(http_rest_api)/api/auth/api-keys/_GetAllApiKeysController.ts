import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../_shared/BaseController";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { ProtectedController } from "../../_shared/ProtectedController";
import { PermissionType } from "../../../../_core/Shared/Domain/VOs/Permission";
import { GetApiKeys } from "../../../../_core/Auth/Application/Queries/GetApiKeys";
import { ApiKey } from "../../../../_core/Auth/Domain/Entities/ApiKey";

export class GetAllApiKeysController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['api_key:read'];
    REQUIRED_PERMISSIONS: PermissionType[] = GetAllApiKeysController.permissions;

    private getApiKeys: GetApiKeys

    constructor() {
        const apiKeyRepository = DIContainer.get('ApiKeyRepository')

        this.getApiKeys = new GetApiKeys(
            apiKeyRepository,
        )
    }

    async run(
        req: NextRequest,
    ): Promise<NextResponse> {
        const apiKeys = await this.getApiKeys.run()

        const apiKeysResponse = this.mapToResponse(apiKeys);
        return NextResponse.json({ apiKeys: apiKeysResponse }, { status: 200 });
    }

    private mapToResponse(apiKeys: ApiKey[]) {
        return apiKeys.map(apiKey => apiKey.toPrimitives())
    }
}
