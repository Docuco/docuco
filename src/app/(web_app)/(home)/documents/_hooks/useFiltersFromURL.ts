import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DocuFileFiltersPrimitives } from "../../../../_core/Documents/Domain/Primitives/DocuFileFiltersPrimitives";
import { DocuExtensionType } from "../../../../_core/Documents/Domain/VOs/DocuMimeType";

export const useFiltersFromURL = (): [
    DocuFileFiltersPrimitives,
    (filters: DocuFileFiltersPrimitives) => void
]=> {
    const params = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    
    const filters = {
        mimeType: params.has('mimeType') ? params.get('mimeType') as DocuExtensionType : undefined
    }
    
    function setFilters(filters: DocuFileFiltersPrimitives) {
        const newParams = new URLSearchParams()
        if (filters.mimeType) newParams.set('mimeType', filters.mimeType)
        router.push(`${pathname}?${newParams.toString()}`)
    }
    
    return [
        filters,
        setFilters
    ]
};
