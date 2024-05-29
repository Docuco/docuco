import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../_shared/BaseController";
import { z } from "zod";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { CreateUser } from "../../../_core/Users/Application/Commands/CreateUser";

const schema = z.object({
    email: z.string(),
    password: z.string(),
})

export class CreateUserController extends BaseController {
    private createUser: CreateUser

    constructor() {
        super();

        this.createUser = new CreateUser(
            DIContainer.get('UserRepository'),
            DIContainer.get('AuthRepository'),
            DIContainer.get('EventBus')
        )
    }

    async run(
        req: NextRequest,
    ): Promise<NextResponse> {
        const { email, password } = await this.getParams(req);

        await this.createUser.run({email, password})

        return NextResponse.json({}, { status: 201 });
    }

    private async getParams(req: NextRequest) {
        const body = await req.json()

        return schema.parse({
            email: body.email,
            password: body.password,
        })
    }
}
