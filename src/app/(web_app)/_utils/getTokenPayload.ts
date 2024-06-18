import { cookies } from "next/headers";
import { Token } from "../../_core/Auth/Domain/VOs/Token";
import { UserTokenPayload } from "../../_core/Auth/Domain/VOs/UserToken";

export function getTokenPayload() {
    const token = cookies().get('token')
    
    if (!token) {
        throw new Error('Token not found');
    }

    return Token.extractPayload<UserTokenPayload>(token.value);
}
