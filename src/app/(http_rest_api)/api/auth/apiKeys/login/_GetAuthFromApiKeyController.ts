import { NextRequest, NextResponse } from "next/server"
import { z } from "zod";
import { BaseController } from "../../../_shared/BaseController";
import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { cookies } from "next/headers";
import { Token } from "../../../../../_core/Auth/Domain/VOs/Token";
import { GetAuthFromApiKey } from "../../../../../_core/Auth/Application/Queries/GetAuthFromApiKey";
import { ApiKeyFinder } from "../../../../../_core/Auth/Domain/Services/ApiKeyFinder";

const schema = z.object({
    apiKey: z.string(),
})

export class GetAuthFromApiKeyController implements BaseController {
    private getAuthFromApiKey: GetAuthFromApiKey

    constructor() {
        const apiKeyRepository = DIContainer.get('ApiKeyRepository')

        const apiKeyFinder = new ApiKeyFinder(
            apiKeyRepository,
        )

        this.getAuthFromApiKey = new GetAuthFromApiKey(
            apiKeyFinder,
        )
    }

    async run(
        req: NextRequest,
    ): Promise<NextResponse> {
        const { apiKey } = await this.getParams(req);

        const auth = await this.getAuthFromApiKey.run(apiKey)

        cookies().set('token', auth.accessToken, {
            expires: new Date(new Date().getTime() + Token.expiresIn * 1000)
        })
        return NextResponse.json(auth, { status: 200 });
    }

    private async getParams(req: NextRequest) {
        const body = await req.json()

        return schema.parse({
            apiKey: body.apiKey,
        })
    }
}
