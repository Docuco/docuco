import useSWR from "swr";
import { API_ROUTES } from "../../../_utils/constants";
import { fetcher } from "../../../_utils/fetch";
import { DocuFilePrimitive } from "../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { DocuFileFiltersPrimitives } from "../../../../_core/Documents/Domain/Primitives/DocuFileFiltersPrimitives";

export const useGetDocuFiles = (filters: DocuFileFiltersPrimitives) => {
    const queryParams = new URLSearchParams();
    for (const key in filters) {
        if (filters[key as keyof DocuFileFiltersPrimitives]) queryParams.set(key, filters[key as keyof DocuFileFiltersPrimitives] as string);
    }
    const hasParams = queryParams.size > 0;
    
    const { data, error, isValidating } = useSWR(
        hasParams ? `${API_ROUTES.DOCUMENTS}?${queryParams.toString()}` : API_ROUTES.DOCUMENTS,
        (url: string) => fetcher<{files: DocuFilePrimitive[]}>(url)
    );
    const docuFiles = data?.files ?? [];

    return {
        docuFiles,
        error,
        isLoading: isValidating,
    };
};
