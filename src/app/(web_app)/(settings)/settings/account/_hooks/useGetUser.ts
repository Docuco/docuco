import useSWR from "swr";
import { API_ROUTES } from "../../../../_utils/constants";
import { fetcher } from "../../../../_utils/fetch";
import { UserPrimitive } from "../../../../../_core/Users/Domain/Primitives/UserPrimitive";
import { getCookie } from "cookies-next";
import { UserToken } from "../../../../../_core/Auth/Domain/VOs/UserToken";

export const useGetUser = () => {
    const token = getCookie('token');

    if (!token) {
        throw new Error('Token not found');
    }

    const payload = UserToken.extractPayload(token);
    
    const { data, error, isValidating } = useSWR(
        API_ROUTES.USER(payload.userId),
        (url: string) => fetcher<UserPrimitive>(url)
    );
    const user = data;

    return {
        user,
        error,
        isLoading: isValidating,
    };
};
