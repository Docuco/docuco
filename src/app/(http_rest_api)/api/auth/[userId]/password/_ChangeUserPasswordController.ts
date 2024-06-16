import { NextRequest, NextResponse } from "next/server"
import { z } from "zod";
import { PermissionType } from "../../../../../_core/Shared/Domain/VOs/Permission";
import { BaseController } from "../../../_shared/BaseController";
import { ProtectedController } from "../../../_shared/ProtectedController";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { UserFinder } from "../../../../../_core/Users/Domain/Services/UserFinder";
import { ChangeUserPassword } from "../../../../../_core/Auth/Application/Commands/ChangeUserPassword";

const schema = z.object({
    userId: z.string(),
    newPassword: z.string(),
})

export class ChangeUserPasswordController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['users:change_password'];
    REQUIRED_PERMISSIONS: PermissionType[] = ChangeUserPasswordController.permissions;

    private changeUserPassword: ChangeUserPassword

    constructor() {
        const authRepository = DIContainer.get('AuthRepository')
        const eventBus = DIContainer.get('EventBus')
        
        this.changeUserPassword = new ChangeUserPassword(
            authRepository,
            eventBus
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { userId, newPassword } = await this.getParams(req, pathParams);

        await this.changeUserPassword.run({ userId, newPassword })

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        const body = await req.json()

        return schema.parse({
            userId: pathParams.userId,
            newPassword: body.password,
        })
    }
}
