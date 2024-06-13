import { DocuFileFiltersPrimitives } from '../../../../../_core/Documents/Domain/Primitives/DocuFileFiltersPrimitives';
import classes from './DocuFileFilters.module.css';
import { TypeFilter } from './TypeFilter/TypeFilter';

export function DocuFileFilters({
    filters,
    onChange,
}: {
    filters: DocuFileFiltersPrimitives,
    onChange: (filters: DocuFileFiltersPrimitives) => void
}) {
    
    return (
        <>
            <TypeFilter value={filters.mimeType} onChange={(mimeType) => onChange({...filters, mimeType})} />
        </>
    );
}