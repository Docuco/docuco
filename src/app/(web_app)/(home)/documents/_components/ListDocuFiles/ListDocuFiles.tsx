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
import { useScreenSize } from "../../../../_utils/_hooks/useScreenSize";
import { DocuFileFilters } from "../DocuFileFilters/DocuFileFilters";
import { useFiltersFromURL } from "../../_hooks/useFiltersFromURL";
import { DocuMimeType } from "../../../../../_core/Documents/Domain/VOs/DocuMimeType";
import { DocVisualizer } from "../Visualizers/DocVisualizer/DocVisualizer";
import { PDFVisualizer } from "../Visualizers/PDFVisualizer/PDFVisualizer";
import { ImageVisualizer } from "../Visualizers/ImageVisualizer/ImageVisualizer";

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
                        {getVisualizer(docuFileToPreview)}
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>
        </div>
    );
}

function getVisualizer(docuFileToPreview: DocuFilePrimitive | null): JSX.Element {
    if (!docuFileToPreview) {
        return <></>
    }
    
    const map = { // TODO: improve type safety
        [DocuMimeType.EXTENSIONS_MIME_TYPES.csv]: <></>,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.txt]: <></>,
        
        [DocuMimeType.EXTENSIONS_MIME_TYPES.doc]: <DocVisualizer docuFile={docuFileToPreview} />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.xls]: <DocVisualizer docuFile={docuFileToPreview} />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.ppt]: <DocVisualizer docuFile={docuFileToPreview} />,

        [DocuMimeType.EXTENSIONS_MIME_TYPES.docx]: <DocVisualizer docuFile={docuFileToPreview} />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.xlsx]: <DocVisualizer docuFile={docuFileToPreview} />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.pptx]: <DocVisualizer docuFile={docuFileToPreview} />,

        [DocuMimeType.EXTENSIONS_MIME_TYPES.odt]: <DocVisualizer docuFile={docuFileToPreview} />,
        // [DocuMimeType.EXTENSIONS_MIME_TYPES.ods]: <></>,
        // [DocuMimeType.EXTENSIONS_MIME_TYPES.odp]: <></>,
        
        [DocuMimeType.EXTENSIONS_MIME_TYPES.pdf]: <PDFVisualizer id="pdf-viewer-docuFile-list" docuFile={docuFileToPreview} fit='width' />,

        [DocuMimeType.EXTENSIONS_MIME_TYPES["7z"]]: <></>,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.gz]: <></>,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.rar]: <></>,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.tar]: <></>,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.zip]: <></>,

        [DocuMimeType.EXTENSIONS_MIME_TYPES.azw]: <></>,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.epub]: <></>,

        [DocuMimeType.EXTENSIONS_MIME_TYPES.avif]: <></>,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.bmp]: <></>,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.gif]: <></>,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.jpeg]: <ImageVisualizer docuFile={docuFileToPreview} />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.jpg]: <ImageVisualizer docuFile={docuFileToPreview} />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.png]: <ImageVisualizer docuFile={docuFileToPreview} />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.svg]: <ImageVisualizer docuFile={docuFileToPreview} />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.tif]: <></>,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.tiff]: <></>,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.webp]: <></>,
    };

    return map[docuFileToPreview.mimeType] || <></>;
} 
