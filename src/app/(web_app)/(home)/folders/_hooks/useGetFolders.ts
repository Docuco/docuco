import useSWR from "swr";
import { API_ROUTES } from "../../../_utils/constants";
import { fetcher } from "../../../_utils/fetch";
import { FolderPrimitive } from "../../../../_core/Folders/Domain/Primitives/FolderPrimitive";

export const useGetFolders = (folderId: string | null) => {
    const { data, error, isValidating } = useSWR(
        folderId ? API_ROUTES.FOLDER(folderId) : API_ROUTES.FOLDERS,
        (url: string) => fetcher<{folders: FolderPrimitive[]}>(url)
    );
    const folders = data?.folders ?? [];

    return {
        folders,
        error,
        isLoading: isValidating,
    };
};
