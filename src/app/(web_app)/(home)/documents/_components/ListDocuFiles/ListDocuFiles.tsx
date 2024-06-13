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
        console.log('endPreviewFile')
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
                        {docuFileToPreview && <PDFViewer id="pdf-viewer-docuFile-list" docuFile={docuFileToPreview} fit='width' />}
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>
        </div>
    );
}
