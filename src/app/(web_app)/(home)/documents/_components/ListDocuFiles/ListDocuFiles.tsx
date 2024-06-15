'use client'

import { useGetDocuFiles } from "../../_hooks/useGetDocuFiles";
import { DocuFile } from "../DocuFile/DocuFile";
import classes from './ListDocuFiles.module.css';
import { DocuFileSkeleton } from "../DocuFile/DocuFileSkeleton";
import { Center, Drawer, Space, Text } from "@mantine/core";
import { IconFiles } from "@tabler/icons-react";
import { DocuFilePrimitive } from "../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { PDFViewer } from "../PDFViewer/PDFViewer";
import { useScreenSize } from "../../../../_utils/_hooks/useScreenSize";
import { DocuFileFilters } from "../DocuFileFilters/DocuFileFilters";
import { useFiltersFromURL } from "../../_hooks/useFiltersFromURL";
import { DocuMimeType } from "../../../../../_core/Documents/Domain/VOs/DocuMimeType";
import { DocViewer } from "../DocViewer/DocViewer";

export function ListDocuFiles() {
    const { isDesktop, isTablet, isMobile } = useScreenSize()
    const [ filters, setFilters ] = useFiltersFromURL();
    const { docuFiles, isLoading } = useGetDocuFiles(filters);
    const [ docuFileToPreview, setDocuFileToPreview ] = useState<null | DocuFilePrimitive>(null);
    const [isPDFViewerOpen, { open: openPDFViewer, close: closePDFViewer }] = useDisclosure(false);

    function previewFile(docuFile: DocuFilePrimitive) {
        setDocuFileToPreview(docuFile)
        openPDFViewer()
    }

    function endPreviewFile() {
        setDocuFileToPreview(null)
        closePDFViewer()
    }

    if (isLoading) {
        return (
            <div className={classes.viewContainer}>
                <DocuFileFilters filters={filters} onChange={setFilters} />

                <section className={classes.listContainer}>
                    {[...new Array(10).keys()].map((index) => (
                        <DocuFileSkeleton key={index} />
                    ))}
                </section>
            </div>
        )
    }

    if (docuFiles.length === 0) {
        return (
            <div className={classes.viewContainer}>
                <DocuFileFilters filters={filters} onChange={setFilters} />
            
                <section>
                    <Space h="120px" />
                    <Center>
                        <IconFiles size={50} color="#9A9A9A" stroke={1.5}/>
                    </Center>
                    <Space h="20px" />
                    <Center>
                        <Text c="#9A9A9A" fw={600} size="1.5rem">No documents found</Text>
                    </Center>
                </section>
            </div>
        )
    }
    
    return (
        <div className={classes.viewContainer}>
            <DocuFileFilters filters={filters} onChange={setFilters} />

            <section className={classes.listContainer}>
                {docuFiles.map((docuFile) => (
                    <DocuFile
                        key={docuFile.id}
                        docuFile={docuFile}
                        onPreview={previewFile}
                    />
                ))}
            </section>

            <Drawer.Root
                offset={8}
                radius="md"
                size={isMobile ? 'xs' : isTablet ? 'lg' : 'xl'}
                opened={isPDFViewerOpen}
                onClose={endPreviewFile}
                position="right"
            >
                <Drawer.Overlay
                    backgroundOpacity={0.1}
                    blur={2}
                />
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.CloseButton />
                    </Drawer.Header>
                    <Drawer.Body style={{ height: 'calc(100% - 60px)' }}>
                        {getViewer(docuFileToPreview)}
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>
        </div>
    );
}

function getViewer(docuFileToPreview: DocuFilePrimitive | null): JSX.Element {
    if (!docuFileToPreview) {
        return <></>
    }
    
    const map = { // TODO: improve type safety
        [DocuMimeType.EXTENSIONS_MIME_TYPES.csv]: <></>,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.pdf]: <PDFViewer id="pdf-viewer-docuFile-list" docuFile={docuFileToPreview} fit='width' />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.doc]: <DocViewer docuFile={docuFileToPreview} />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.docx]: <DocViewer docuFile={docuFileToPreview} />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.xls]: <DocViewer docuFile={docuFileToPreview} />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.xlsx]: <DocViewer docuFile={docuFileToPreview} />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.odt]: <></>,
    };

    return map[docuFileToPreview.mimeType] || <></>;
} 
