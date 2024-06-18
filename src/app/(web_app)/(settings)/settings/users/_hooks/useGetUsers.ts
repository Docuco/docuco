import useSWR from "swr";
import { API_ROUTES } from "../../../../_utils/constants";
import { fetcher } from "../../../../_utils/fetch";
import { UserPrimitive } from "../../../../../_core/Users/Domain/Primitives/UserPrimitive";

export const useGetUsers = () => {
    const { data, error, isValidating } = useSWR(
        API_ROUTES.USERS,
        (url: string) => fetcher<{ users: UserPrimitive[] }>(url)
    );
    const users = data?.users ?? [];

    return {
        users,
        error,
        isLoading: isValidating,
    };
};
