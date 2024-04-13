import useSWR from "swr";
import { API_ROUTES } from "../../../../_utils/constants";
import { fetcher } from "../../../../_utils/fetch";
import { AccountPrimitive } from "../../../../../_core/Accounts/Domain/Primitives/AccountPrimitive";

export const useGetAccount = () => {
    const { data, error, isValidating } = useSWR(
        API_ROUTES.ACCOUNT("admin@admin.com"),
        (url: string) => fetcher<AccountPrimitive>(url)
    );
    const account = data;

    return {
        account,
        error,
        isLoading: isValidating,
    };
};
