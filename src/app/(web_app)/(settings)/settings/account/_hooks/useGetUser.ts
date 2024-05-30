import useSWR from "swr";
import { API_ROUTES } from "../../../../_utils/constants";
import { fetcher } from "../../../../_utils/fetch";
import { UserPrimitive } from "../../../../../_core/Users/Domain/Primitives/UserPrimitive";

export const useGetUser = () => {
    const { data, error, isValidating } = useSWR(
        API_ROUTES.USER("123"), // TODO:
        (url: string) => fetcher<UserPrimitive>(url)
    );
    const user = data;

    return {
        user,
        error,
        isLoading: isValidating,
    };
};
