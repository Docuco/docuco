import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../_shared/BaseController";
import { z } from "zod";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { CreateAccount } from "../../../_core/Accounts/Application/Commands/CreateAccount";

const schema = z.object({
    email: z.string(),
    password: z.string(),
})

export class CreateAccountController extends BaseController {
    private createAccount: CreateAccount

    constructor() {
        super();

        this.createAccount = new CreateAccount(
            DIContainer.get('AccountRepository'),
            DIContainer.get('AuthRepository'),
            DIContainer.get('EventBus')
        )
    }

    async run(
        req: NextRequest,
    ): Promise<NextResponse> {
        const { email, password } = await this.getParams(req);

        await this.createAccount.run({email, password})

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
