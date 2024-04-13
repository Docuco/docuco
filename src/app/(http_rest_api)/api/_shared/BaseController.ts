import { NextRequest } from "next/server";

export abstract class BaseController {

    constructor() {
    }

    // protected getTokenFromReq(req: NextRequest): Token {
    //     const tokenValue = TokenService.getToken()

    //     if (!tokenValue) {
    //         throw new Unauthorized();
    //     }

    //     return Token.reconstructor(tokenValue);
    // }

    // TODO: To think if we need it (it's not in use)
    // protected getOptionalTokenFromReq(req: NextRequest): Option<Token> {
    //     const tokenValue = TokenService.getToken()

    //     if (!tokenValue) {
    //         return Option.none();
    //     }

    //     if (tokenValue) {
    //         return Option.some(Token.reconstructor(tokenValue));
    //     }

    //     return Option.none();
    // }
} 