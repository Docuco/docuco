import useSWR from "swr";
import { API_ROUTES } from "../../../../_utils/constants";
import { fetcher } from "../../../../_utils/fetch";
import { UserPrimitive } from "../../../../../_core/Users/Domain/Primitives/UserPrimitive";
import { useTokenPayload } from "../../../../_utils/_hooks/useTokenPayload";

export const useGetUserAccount = () => {
    const tokenPayload = useTokenPayload();
    
    const { data, error, isValidating } = useSWR(
        API_ROUTES.USER_ACCOUNT(),
        (url: string) => fetcher<UserPrimitive>(url)
    );
    const user = data;

    return {
        user,
        error,
        isLoading: isValidating,
    };
};
