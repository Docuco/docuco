import { Select, useCombobox } from '@mantine/core';
import classes from './TypeFilter.module.css';
import { useState } from 'react';
import { DocuMimeType, DocuExtensionType, DocuMimeTypeType } from '../../../../../../_core/Documents/Domain/VOs/DocuMimeType';

export function TypeFilter({
    value,
    onChange,
}: {
        value: DocuExtensionType | undefined,
        onChange: (value: DocuExtensionType) => void
}) {
    
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [internalValue, setInternalValue] = useState<DocuExtensionType | null>(value || null);

    const options = DocuMimeType.ValidValues.map((mimeType: DocuMimeTypeType) => {
        const extension = DocuMimeType.MIME_TYPES_EXTENSIONS[mimeType]
        
        return  extension
    });
    
    return (
        <>
            <Select
                w={90}
                placeholder="Type"
                data={options}
                defaultValue={internalValue}
                clearable
                allowDeselect
                onChange={(value) => {
                    setInternalValue(value as DocuExtensionType);
                    onChange(value as DocuExtensionType);
                }}
            />
        </>
    );
}