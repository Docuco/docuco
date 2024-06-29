import useSWR from "swr";
import { API_ROUTES } from "../../../_utils/constants";
import { fetcher } from "../../../_utils/fetch";
import { DocuFilePrimitive } from "../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";

export const useGetDeletedDocuFiles = (parentFolderId: string | null) => {
    const { data, error, isValidating } = useSWR(
        parentFolderId ? API_ROUTES.DOCUMENTS_DELETED_BY_FOLDER(parentFolderId) : API_ROUTES.ROOT_DOCUMENTS_DELETED,
        (url: string) => fetcher<{files: DocuFilePrimitive[]}>(url)
    );
    const deletedDocuFiles = data?.files ?? [];

    return {
        deletedDocuFiles,
        error,
        isLoading: isValidating,
    };
};
