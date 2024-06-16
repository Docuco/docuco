import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../_shared/BaseController";
import { z } from "zod";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { UserFinder } from "../../../../_core/Users/Domain/Services/UserFinder";
import { PermissionType } from "../../../../_core/Shared/Domain/VOs/Permission";
import { ProtectedController } from "../../_shared/ProtectedController";
import { DeleteUser } from "../../../../_core/Users/Application/Commands/DeleteUser";

const schema = z.object({
    id: z.string(),
})

export class DeleteUserController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['users:delete'];
    REQUIRED_PERMISSIONS: PermissionType[] = DeleteUserController.permissions;

    private deleteUser: DeleteUser

    constructor() {
        const userRepository = DIContainer.get('UserRepository')
        const authRepository = DIContainer.get('AuthRepository')
        const eventBus = DIContainer.get('EventBus')

        const userFinder = new UserFinder(
            userRepository,
        )

        this.deleteUser = new DeleteUser(
            userFinder,
            userRepository,
            authRepository,
            eventBus,
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { id } = await this.getParams(req, pathParams);

        const user = await this.deleteUser.run({ id })

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            id: pathParams.id,
        })
    }

}
