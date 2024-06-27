import useSWR from "swr";
import { API_ROUTES } from "../../../_utils/constants";
import { DocuFilePrimitive } from "../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { DocuFileFiltersPrimitives } from "../../../../_core/Documents/Domain/Primitives/DocuFileFiltersPrimitives";
import { fetcher } from "../../../_utils/fetch";

export const useGetDocuFiles = ({ filters, folderParentId }: { filters: DocuFileFiltersPrimitives, folderParentId: string | null}) => {
    const url = getURL({ filters, folderParentId });
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
    folderParentId
}: {
    filters: DocuFileFiltersPrimitives,
    folderParentId: string | null
}): string {
    const queryParams = new URLSearchParams();
    for (const key in filters) {
        if (filters[key as keyof DocuFileFiltersPrimitives]) {
            queryParams.set(key, filters[key as keyof DocuFileFiltersPrimitives] as string);
        }
    }
    const hasParams = queryParams.size > 0;
    
    if (folderParentId) {
        return hasParams
            ? `${API_ROUTES.DOCUMENTS_BY_FOLDER(folderParentId)}?${queryParams.toString()}`
            : `${API_ROUTES.DOCUMENTS_BY_FOLDER(folderParentId)}`;
    }
    
    return hasParams
        ? `${API_ROUTES.ROOT_FOLDER_DOCUMENTS}?${queryParams.toString()}`
        : API_ROUTES.ROOT_FOLDER_DOCUMENTS;
}