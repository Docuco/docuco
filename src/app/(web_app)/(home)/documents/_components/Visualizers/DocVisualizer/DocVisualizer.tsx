'use client'

import { DocuFilePrimitive } from '../../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive';
import Viewer, { DocViewerRenderers, IHeaderOverride } from "@cyntler/react-doc-viewer";
import { DocuMimeType } from '../../../../../../_core/Documents/Domain/VOs/DocuMimeType';

export function DocVisualizer({
    docuFile,
}: {
    docuFile: DocuFilePrimitive,
}) {
    const urlToFile = encodeURIComponent(docuFile.url);

    return (
        <>
            <Viewer
                style={{ width: '100%', height: '100%' }}
                pluginRenderers={DocViewerRenderers}
                documents={[
                    {
                        uri: docuFile.url,
                        fileType: DocuMimeType.MIME_TYPES_EXTENSIONS[docuFile.mimeType],
                    }
                ]}
                config={{
                    header: {
                        disableHeader: true,
                        disableFileName: true,
                        overrideComponent: EmptyHeader,
                    }
                }}
            />
        </>
    );
}

const EmptyHeader: IHeaderOverride = () => {
    return (
        <>
        </>
    );
}