import useSWR from "swr";
import { API_ROUTES } from "../../../_utils/constants";
import { DocuFilePrimitive } from "../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { DocuFileFiltersPrimitives } from "../../../../_core/Documents/Domain/Primitives/DocuFileFiltersPrimitives";
import { fetcher } from "../../../_utils/fetch";

export const useGetDocuFiles = ({ filters, parentFolderId }: { filters: DocuFileFiltersPrimitives, parentFolderId: string | null}) => {
    const url = getURL({ filters, parentFolderId });
    const { data, error, isValidating } = useSWR(
        url,
        (url: string) => fetcher<{ files: DocuFilePrimitive[] }>(url)
    );

    const docuFiles = data?.files ?? [];

    return {
        docuFiles,
        error,
        isLoading: isValidating,
    };
};

function getURL({
    filters,
    parentFolderId
}: {
    filters: DocuFileFiltersPrimitives,
    parentFolderId: string | null
}): string {
    const queryParams = new URLSearchParams();
    for (const key in filters) {
        if (filters[key as keyof DocuFileFiltersPrimitives]) {
            queryParams.set(key, filters[key as keyof DocuFileFiltersPrimitives] as string);
        }
    }
    const hasParams = queryParams.size > 0;
    
    if (parentFolderId) {
        return hasParams
            ? `${API_ROUTES.DOCUMENTS_BY_FOLDER(parentFolderId)}?${queryParams.toString()}`
            : `${API_ROUTES.DOCUMENTS_BY_FOLDER(parentFolderId)}`;
    }
    
    return hasParams
        ? `${API_ROUTES.ROOT_FOLDER_DOCUMENTS}?${queryParams.toString()}`
        : API_ROUTES.ROOT_FOLDER_DOCUMENTS;
}