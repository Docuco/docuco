import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../_shared/BaseController";
import { z } from "zod";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { GetUser } from "../../../../_core/Users/Application/Queries/GetUser";
import { UserFinder } from "../../../../_core/Users/Domain/Services/UserFinder";
import { User } from "../../../../_core/Users/Domain/Entities/User";

const schema = z.object({
    email: z.string(),
})

export class GetUserController extends BaseController {
    private getUser: GetUser

    constructor() {
        super();

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
        const { email } = await this.getParams(req, pathParams);

        const user = await this.getUser.run({email})

        const userPrimitive = this.mapResponse(user)

        return NextResponse.json(userPrimitive, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            email: pathParams.email,
        })
    }

    private mapResponse(user: User) {
        return user.toPrimitives()
    }
}
