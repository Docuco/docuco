import { NextRequest, NextResponse } from "next/server"
import { BaseController } from "../../../_shared/BaseController";
import { z } from "zod";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { AccountFinder } from "../../../../../_core/Accounts/Domain/Services/AccountFinder";
import { ChangeSettings } from "../../../../../_core/Accounts/Application/Commands/ChangeSettings";

const schema = z.object({
    email: z.string(),
    settings: z.object({
        database: z.string().optional(),
    })
})

export class ChangeSettingsController extends BaseController {
    private changeSettings: ChangeSettings

    constructor() {
        super();

        const accountRepository = DIContainer.get('AccountRepository');
        const eventBus = DIContainer.get('EventBus');
        
        const accountFinder = new AccountFinder(
            accountRepository
        )

        this.changeSettings = new ChangeSettings(
            accountRepository,
            accountFinder,
            eventBus
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { email, settings } = await this.getParams(req, pathParams);

        await this.changeSettings.run({ email, settings })

        return NextResponse.json({}, { status: 200 });
    }

    private async getParams(req: NextRequest, pathParams: Record<string, string>) {
        const body = await req.json()

        return schema.parse({
            email: pathParams.email,
            settings: body.settings
        })
    }
}
