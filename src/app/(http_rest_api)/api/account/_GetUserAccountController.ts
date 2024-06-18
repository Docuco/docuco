import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../_shared/BaseController";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { ProtectedController } from "../_shared/ProtectedController";
import { PermissionType } from "../../../_core/Shared/Domain/VOs/Permission";
import { User } from "../../../_core/Users/Domain/Entities/User";
import { GetUser } from "../../../_core/Users/Application/Queries/GetUser";
import { UserFinder } from "../../../_core/Users/Domain/Services/UserFinder";
import { z } from "zod";
import { getTokenPayload } from "../../../(web_app)/_utils/getTokenPayload";

const schema = z.object({
    userId: z.string(),
})

export class GetUserAccountController implements BaseController, ProtectedController{
    static permissions: PermissionType[] = [];
    REQUIRED_PERMISSIONS: PermissionType[] = GetUserAccountController.permissions;

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
        const { userId } = await this.getParams();

        const user = await this.getUser.run({ id: userId })

        const userPrimitive = this.mapResponse(user)

        return NextResponse.json(userPrimitive, { status: 200 });
    }

    private async getParams() {
        const { userId } = getTokenPayload()

        return schema.parse({
            userId,
        })
    }

    private mapResponse(user: User) {
        return user.toPrimitives()
    }
}
