import { Token } from "../../../_core/Auth/Domain/VOs/Token";
import { getCookie } from "cookies-next";
import { UserTokenPayload } from "../../../_core/Auth/Domain/VOs/UserToken";

export function useTokenPayload(): UserTokenPayload {
    const token = getCookie('token')

    if (!token) {
        throw new Error('Token not found');
    }

    const tokenPayload = Token.extractPayload<UserTokenPayload>(token);

    return tokenPayload;
}