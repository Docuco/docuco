import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../_shared/BaseController";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { ProtectedController } from "../_shared/ProtectedController";
import { PermissionType } from "../../../_core/Shared/Domain/VOs/Permission";
import { UserPrimitive } from "../../../_core/Users/Domain/Primitives/UserPrimitive";
import { User } from "../../../_core/Users/Domain/Entities/User";
import { GetUsers } from "../../../_core/Users/Application/Queries/GetUsers";

export class GetUsersController implements BaseController, ProtectedController{
    static permissions: PermissionType[] = ['users:read'];
    REQUIRED_PERMISSIONS: PermissionType[] = GetUsersController.permissions;

    private getUsers: GetUsers

    constructor() {
        this.getUsers = new GetUsers(
            DIContainer.get('UserRepository'),
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
     ): Promise<NextResponse> {
        const users = await this.getUsers.run()

        const usersResponse = this.mapResponse(users)
        return NextResponse.json({ users: usersResponse }, { status: 200 });
    }

    private mapResponse(docuFiles: User[]): UserPrimitive[] {
        return docuFiles.map(docuFile => docuFile.toPrimitives())
    }
}
