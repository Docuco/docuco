import useSWR from "swr";
import { API_ROUTES } from "../../../_utils/constants";
import { fetcher } from "../../../_utils/fetch";
import { FolderAncestorsDTO } from "../../../../_core/Folders/Application/DTOs/FolderAncestorsDTO";

export const useGetFolderAncestors = (folderId: string | null) => {
    const { data, error, isValidating } = useSWR(
        folderId ? API_ROUTES.FOLDER_ANCESTORS(folderId) : null,
        (url: string) => fetcher<{ ancestors: FolderAncestorsDTO}>(url)
    );
    const ancestors = data?.ancestors ?? null;

    return {
        ancestors,
        error,
        isLoading: isValidating,
    };
};
