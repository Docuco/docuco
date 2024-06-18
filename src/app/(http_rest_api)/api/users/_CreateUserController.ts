import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../_shared/BaseController";
import { z } from "zod";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { CreateUser } from "../../../_core/Users/Application/Commands/CreateUser";
import { ProtectedController } from "../_shared/ProtectedController";
import { Permission, PermissionType } from "../../../_core/Shared/Domain/VOs/Permission";

const schema = z.object({
    email: z.string(),
    password: z.string(),
    permissions: z.enum(Permission.ValidValues).array(),
})

export class CreateUserController implements BaseController, ProtectedController{
    static permissions: PermissionType[] = ['users:create'];
    REQUIRED_PERMISSIONS: PermissionType[] = CreateUserController.permissions;

    private createUser: CreateUser

    constructor() {
        this.createUser = new CreateUser(
            DIContainer.get('UserRepository'),
            DIContainer.get('AuthRepository'),
            DIContainer.get('EventBus')
        )
    }

    async run(
        req: NextRequest,
    ): Promise<NextResponse> {
        const { email, password, permissions } = await this.getParams(req);

        await this.createUser.run({ email, password, permissions })

        return NextResponse.json({}, { status: 201 });
    }

    private async getParams(req: NextRequest) {
        const body = await req.json()

        return schema.parse({
            email: body.email,
            password: body.password,
            permissions: body.permissions,
        })
    }
}
