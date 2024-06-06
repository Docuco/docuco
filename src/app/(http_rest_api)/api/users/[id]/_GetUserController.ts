import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../_shared/BaseController";
import { z } from "zod";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { GetUser } from "../../../../_core/Users/Application/Queries/GetUser";
import { UserFinder } from "../../../../_core/Users/Domain/Services/UserFinder";
import { User } from "../../../../_core/Users/Domain/Entities/User";
import { PermissionType } from "../../../../_core/Shared/Domain/VOs/Permission";
import { ProtectedController } from "../../_shared/ProtectedController";

const schema = z.object({
    id: z.string(),
})

export class GetUserController implements BaseController, ProtectedController {
    static permissions: PermissionType[] = ['users:read'];
    REQUIRED_PERMISSIONS: PermissionType[] = GetUserController.permissions;

    private getUser: GetUser

    constructor() {
        const userFinder = new UserFinder(
            DIContainer.get('UserRepository'),
        )

        this.getUser = new GetUser(
            userFinder
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { id } = await this.getParams(req, pathParams);

        const user = await this.getUser.run({ id })

        const userPrimitive = this.mapResponse(user)

        return NextResponse.json(userPrimitive, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            id: pathParams.id,
        })
    }

    private mapResponse(user: User) {
        return user.toPrimitives()
    }
}
