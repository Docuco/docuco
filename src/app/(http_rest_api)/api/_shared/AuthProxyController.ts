import { NextRequest, NextResponse } from "next/server";
import { InvalidToken } from "../../../_core/Auth/Domain/Exceptions/InvalidToken";
import { BaseController } from "./BaseController";
import { ProtectedController } from "./ProtectedController";
import { Token, TokenPayload } from "../../../_core/Auth/Domain/VOs/Token";
import { Unauthorized } from "../../../_core/Shared/Domain/Exceptions/Unauthorized";
import { cookies } from "next/headers";
import { Auth } from "../../../_core/Auth/Domain/Entities/Auth";

export class AuthProxyController<T extends ProtectedController & BaseController> implements BaseController {

    constructor(private controller: T) { }

    public async run(req: NextRequest, pathParams?: Record<string, string>): Promise<NextResponse> {
        this.ensureRequestHasPermissions(req);
        return this.controller.run(req, pathParams);
    }

    public ensureRequestHasPermissions(req: NextRequest): void {
        const requiredPermissions = this.controller.REQUIRED_PERMISSIONS;
        if (requiredPermissions.length === 0) {
            return;
        }

        const token = this.getTokenFromRequest(req);

        this.refreshToken(req, token)
        
        const tokenPermissions = token.payload.permissions as string[];
        if (!tokenPermissions || !Array.isArray(tokenPermissions)) {
            throw new Unauthorized(requiredPermissions);
        }

        const tokenContainsAllRequiredPermissions = requiredPermissions.every((required) => tokenPermissions.includes(required));
        if (!tokenContainsAllRequiredPermissions) {
            throw new Unauthorized(requiredPermissions);
        }
    }

    private getTokenFromRequest(req: NextRequest): Token {
        const tokenPrimitive = this.getTokenPrimitiveFromRequest(req)

        try {
            return Token.reconstructor(process.env.JWT_SECRET!, tokenPrimitive);
        } catch (error) {
            throw new InvalidToken();
        }
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

    private refreshToken(req: NextRequest, token: Token) {
        const newToken = token.regenerate(process.env.JWT_SECRET!).value
        cookies().set('token', newToken, {
            expires: new Date(new Date().getTime() + Auth.expiresIn * 1000)
        })

        const newHeaders = new Headers(req.headers)
        newHeaders.set('Authorization', `Bearer ${newToken}`)
        NextResponse.next({
            request: {
                headers: newHeaders
            }
        })
    }

} 