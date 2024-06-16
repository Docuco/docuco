import { NextRequest, NextResponse } from "next/server"
import { z } from "zod";
import { Permission, PermissionType } from "../../../../../_core/Shared/Domain/VOs/Permission";
import { BaseController } from "../../../_shared/BaseController";
import { ProtectedController } from "../../../_shared/ProtectedController";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { ChangeUserPermissions } from "../../../../../_core/Users/Application/Commands/ChangeUserPermissions";
import { UserFinder } from "../../../../../_core/Users/Domain/Services/UserFinder";

const schema = z.object({
    userId: z.string(),
    newPermissions: z.enum(Permission.ValidValues).array(),
})

export class ChangeUserPermissionsController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['users:change_permissions'];
    REQUIRED_PERMISSIONS: PermissionType[] = ChangeUserPermissionsController.permissions;

    private changeUserPermissions: ChangeUserPermissions

    constructor() {
        const userRepository = DIContainer.get('UserRepository')
        const eventBus = DIContainer.get('EventBus')
        
        const userFinder = new UserFinder(
            userRepository,
        )

        this.changeUserPermissions = new ChangeUserPermissions(
            userFinder,
            userRepository,
            eventBus
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { userId, newPermissions } = await this.getParams(req, pathParams);

        await this.changeUserPermissions.run({ userId, newPermissions })

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        const body = await req.json()

        return schema.parse({
            userId: pathParams.id,
            newPermissions: body.permissions,
        })
    }
}
