import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../_shared/BaseController";
import { z } from "zod";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { GetAccount } from "../../../../_core/Accounts/Application/Queries/GetAccount";
import { AccountFinder } from "../../../../_core/Accounts/Domain/Services/AccountFinder";
import { Account } from "../../../../_core/Accounts/Domain/Entities/Account";

const schema = z.object({
    email: z.string(),
})

export class GetAccountController extends BaseController {
    private getAccount: GetAccount

    constructor() {
        super();

        const accountFinder = new AccountFinder(
            DIContainer.get('AccountRepository'),
        )

        this.getAccount = new GetAccount(
            accountFinder
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { email } = await this.getParams(req, pathParams);

        const account = await this.getAccount.run({email})

        const accountPrimitive = this.mappResponse(account)

        return NextResponse.json(accountPrimitive, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        return schema.parse({
            email: pathParams.email,
        })
    }

    private mappResponse(account: Account) {
        return account.toPrimitives()
    }
}
