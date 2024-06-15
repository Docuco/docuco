import { NextRequest, NextResponse } from "next/server"
import { z } from "zod";
import { GetAuthFromLogin } from "../../../../_core/Auth/Application/Queries/GetAuthFromLogin";
import { BaseController } from "../../_shared/BaseController";
import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { cookies } from "next/headers";
import { Token } from "../../../../_core/Auth/Domain/VOs/Token";

const schema = z.object({
    email: z.string(),
    password: z.string(),
})

export class GetAuthFromLoginController implements BaseController {
    private getAuthFromLogin: GetAuthFromLogin

    constructor() {
        const userRepository = DIContainer.get('UserRepository')
        const authRepository = DIContainer.get('AuthRepository')

        this.getAuthFromLogin = new GetAuthFromLogin(
            userRepository,
            authRepository
        )
    }

    async run(
        req: NextRequest,
        pathParams: Record<string, string>
    ): Promise<NextResponse> {
        const { email, password } = await this.getParams(req);

        const auth = await this.getAuthFromLogin.run({ email, password })

        cookies().set('token', auth.accessToken, {
            expires: new Date(new Date().getTime() + Token.expiresIn * 1000)
        })
        return NextResponse.json(auth, { status: 200 });
    }

    private async getParams(req: NextRequest) {
        const body = await req.json()

        return schema.parse({
            email: body.email,
            password: body.password,
        })
    }
}
