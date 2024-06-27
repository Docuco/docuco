import useSWR from "swr";
import { API_ROUTES } from "../../../_utils/constants";
import { fetcher } from "../../../_utils/fetch";
import { FolderPrimitive } from "../../../../_core/Folders/Domain/Primitives/FolderPrimitive";

export const useGetDeletedFolders = (folderId: string | null) => {
    const { data, error, isValidating } = useSWR(
        folderId ? API_ROUTES.FOLDER_DELETED_BY_FOLDER_PARENT(folderId) : API_ROUTES.FOLDERS_DELETED,
        (url: string) => fetcher<{folders: FolderPrimitive[]}>(url)
    );
    const deletedFolders = data?.folders ?? [];

    return {
        deletedFolders,
        error,
        isLoading: isValidating,
    };
};
