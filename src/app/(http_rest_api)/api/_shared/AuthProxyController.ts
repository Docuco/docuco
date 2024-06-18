import { NextRequest, NextResponse } from "next/server";
import { InvalidToken } from "../../../_core/Auth/Domain/Exceptions/InvalidToken";
import { BaseController } from "./BaseController";
import { ProtectedController } from "./ProtectedController";
import { UserToken, UserTokenPayload } from "../../../_core/Auth/Domain/VOs/UserToken";
import { Unauthorized } from "../../../_core/Shared/Domain/Exceptions/Unauthorized";
import { cookies } from "next/headers";
import { Auth } from "../../../_core/Auth/Domain/Entities/Auth";
import { Token } from "../../../_core/Auth/Domain/VOs/Token";
import { PermissionType } from "../../../_core/Shared/Domain/VOs/Permission";
import { GetAuthFromUserToken } from "../../../_core/Auth/Application/Queries/GetAuthFromUserToken";
import { UserFinder } from "../../../_core/Users/Domain/Services/UserFinder";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";

export class AuthProxyController<T extends ProtectedController & BaseController> implements BaseController {

    constructor(private controller: T) { }

    public async run(req: NextRequest, pathParams?: Record<string, string>): Promise<NextResponse> {
        await this.ensureRequestHasPermissions(req);
        return this.controller.run(req, pathParams);
    }

    public async ensureRequestHasPermissions(req: NextRequest): Promise<void> {
        const requiredPermissions = this.controller.REQUIRED_PERMISSIONS;
        if (requiredPermissions.length === 0) {
            return;
        }

        const token = this.getTokenFromRequest(req);
        const newToken = await this.getAndRefreshNewToken(req, token)
        
        const tokenPermissions = Token.extractPayload<{ permissions: PermissionType[] }>(newToken).permissions as string[];
        if (!tokenPermissions || !Array.isArray(tokenPermissions)) {
            throw new Unauthorized(requiredPermissions);
        }

        const tokenContainsAllRequiredPermissions = requiredPermissions.every((required) => tokenPermissions.includes(required));
        if (!tokenContainsAllRequiredPermissions) {
            throw new Unauthorized(requiredPermissions);
        }
    }

    private getTokenFromRequest(req: NextRequest): string {
        const tokenPrimitive = this.getTokenPrimitiveFromRequest(req)
        
        if (!Token.isValid(process.env.JWT_SECRET!, tokenPrimitive)) {
            throw new InvalidToken();
        }

        return tokenPrimitive;
    }

    private getTokenPrimitiveFromRequest(req: NextRequest): string {
        const tokenPrimitiveFromCookie = cookies().get('token');
        if (tokenPrimitiveFromCookie) {
            return tokenPrimitiveFromCookie.value;
        }

        const tokenPrimitiveFromHeader = req.headers.get('Authorization')?.split(' ')[1];
        if (tokenPrimitiveFromHeader) {
            return tokenPrimitiveFromHeader;
        }
        
        throw new InvalidToken();
    }

    private async getAndRefreshNewToken(req: NextRequest, token: string): Promise<string> {
        const userRepository = DIContainer.get('UserRepository')
        const authRepository = DIContainer.get('AuthRepository')

        const userFinder = new UserFinder(
            userRepository
        )
        const getAuthFromUserToken = new GetAuthFromUserToken(
            userFinder,
            authRepository
        )

        const auth = await getAuthFromUserToken.run(token);

        cookies().set('token', auth.accessToken, {
            expires: new Date(new Date().getTime() + Token.expiresIn * 1000)
        })

        const newHeaders = new Headers(req.headers)
        newHeaders.set('Authorization', `Bearer ${auth.accessToken}`)
        NextResponse.next({
            request: {
                headers: newHeaders
            }
        })

        return auth.accessToken
    }

} 