import useSWR from "swr";
import { API_ROUTES } from "../../../_utils/constants";
import { fetcher } from "../../../_utils/fetch";
import { DocuFilePrimitive } from "../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";

export const useGetDocuFiles = () => {
    const { data, error, isValidating } = useSWR(
        API_ROUTES.DOCUMENTS,
        (url: string) => fetcher<{files: DocuFilePrimitive[]}>(url)
    );
    const docuFiles = data?.files ?? [];

    return {
        docuFiles,
        error,
        isLoading: isValidating,
    };
};
