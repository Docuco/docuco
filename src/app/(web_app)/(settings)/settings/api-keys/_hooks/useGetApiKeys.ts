import useSWR from "swr";
import { API_ROUTES } from "../../../../_utils/constants";
import { fetcher } from "../../../../_utils/fetch";
import { ApiKeyPrimitive } from "../../../../../_core/Auth/Domain/Primitives/ApiKeyPrimitive";

export const useGetApiKeys = () => {
    const { data, error, isValidating } = useSWR(
        API_ROUTES.API_KEYS,
        (url: string) => fetcher<{ apiKeys: ApiKeyPrimitive[] }>(url)
    );
    const apiKeys = data?.apiKeys ?? [];

    return {
        apiKeys,
        error,
        isLoading: isValidating,
    };
};
