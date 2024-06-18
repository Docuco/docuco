import { ActionIcon, Card, CardSection, Center, Group, Menu, MenuDropdown, MenuItem, MenuTarget, Text, Tooltip, rem } from "@mantine/core";
import { DocuFilePrimitive } from "../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import classes from './DocuFile.module.css'
import { IconDots, IconDownload, IconEye, IconShare, IconTrash } from "@tabler/icons-react";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { DeleteDocuFileModal } from "./DeleteDocuFileModal";
import { ShareDocuFileModal, buildShareURL } from "./ShareDocuFileModal";
import { API_ROUTES } from "../../../../_utils/constants";
import { mutate } from "swr";
import { DocuMimeType, DocuMimeTypeType } from "../../../../../_core/Documents/Domain/VOs/DocuMimeType";
import { getFileTypeIcon } from "../../../../_utils/getFileTypeIcon";
import { useTokenPayload } from "../../../../_utils/_hooks/useTokenPayload";

export function DocuFile({
    docuFile,
    onPreview,
}: {
    docuFile: DocuFilePrimitive
    onPreview: (docuFile: DocuFilePrimitive) => void
}) {
    const [isOpenedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [isOpenedShareModal, { open: openShareModal, close: closeShareModal }] = useDisclosure(false);
    const clipboard = useClipboard({ timeout: 1000 });

    const tokenPayload = useTokenPayload()

    const canDelete = tokenPayload.permissions.includes('documents:delete')
    const canShare = tokenPayload.permissions.includes('documents:share')
    
    const fileTypeIcon = getFileTypeIcon(docuFile.mimeType);
    const canPreview = hasValidPreview(docuFile);

    function download() {
        const link = document.createElement('a');
        link.href = docuFile.url;
        link.download = docuFile.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={`${classes.card} ${canPreview ? classes.card_can_preview : ''}`}
                onDoubleClick={() => canPreview && onPreview(docuFile)}
            >
                <CardSection inheritPadding py="xs">
                    <Group justify="space-between">
                        {docuFile.sharedToken
                            ?
                            (<Tooltip label={clipboard.copied ? 'Copied' : 'Copy shared URL'}>
                                <ActionIcon variant="subtle" color={clipboard.copied ? 'teal' : 'gray'} onClick={() => clipboard.copy(buildShareURL(docuFile.sharedToken))}>
                                    <IconShare style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                            </Tooltip>)
                            : (<div></div>)
                        }
                        <Menu withinPortal position="bottom-end" shadow="sm">
                            <MenuTarget>
                                <ActionIcon variant="subtle" color="gray" onClick={(e) => e.stopPropagation()}>
                                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                            </MenuTarget>

                            <MenuDropdown>
                                {canPreview && <MenuItem
                                    leftSection={<IconEye color='indigo' style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => onPreview(docuFile)}
                                >
                                    Preview
                                </MenuItem>}
                                {canShare && <MenuItem
                                    leftSection={<IconShare color='lightseagreen' style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => openShareModal()}
                                >
                                    Share
                                </MenuItem>}
                                <MenuItem
                                    leftSection={<IconDownload color='darkcyan' style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => download()}
                                >
                                    Download
                                </MenuItem>
                                {canDelete && <MenuItem
                                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                    color="red"
                                    onClick={openDeleteModal}
                                >
                                    Delete
                                </MenuItem>}
                            </MenuDropdown>
                        </Menu>
                    </Group>
                </CardSection>

                <Center inline>
                    {fileTypeIcon}
                </Center>

                <Group justify="space-between" mt="md" mb="xs" className={classes.text}>
                    <Text fw={500} lineClamp={2}>{docuFile.name}.{docuFile.extension}</Text>
                </Group>
            </Card>

            <DeleteDocuFileModal docuFile={docuFile} onClose={closeDeleteModal} opened={isOpenedDeleteModal} />
            <ShareDocuFileModal docuFile={docuFile} onClose={async() => {
                await mutate(API_ROUTES.DOCUMENTS)
                closeShareModal()
            }} opened={isOpenedShareModal}/>
        </>
    );
}

function hasValidPreview(docuFile: DocuFilePrimitive): boolean {
    const validExtensionsToPreview: DocuMimeTypeType[] = [
        DocuMimeType.EXTENSIONS_MIME_TYPES.csv,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.txt,

        DocuMimeType.EXTENSIONS_MIME_TYPES.doc,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.xls,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.ppt,
        
        DocuMimeType.EXTENSIONS_MIME_TYPES.docx,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.xlsx,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.pptx,
        
        DocuMimeType.EXTENSIONS_MIME_TYPES.odt,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.ods,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.odp,
        
        DocuMimeType.EXTENSIONS_MIME_TYPES.pdf,

        // DocuMimeType.EXTENSIONS_MIME_TYPES["7z"],
        // DocuMimeType.EXTENSIONS_MIME_TYPES.gz,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.rar,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.tar,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.zip,

        // DocuMimeType.EXTENSIONS_MIME_TYPES.azw,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.epub,

        // DocuMimeType.EXTENSIONS_MIME_TYPES.avif,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.bmp,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.gif,
        DocuMimeType.EXTENSIONS_MIME_TYPES.jpeg,
        DocuMimeType.EXTENSIONS_MIME_TYPES.jpg,
        DocuMimeType.EXTENSIONS_MIME_TYPES.png,
        DocuMimeType.EXTENSIONS_MIME_TYPES.svg,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.tif,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.tiff,
        // DocuMimeType.EXTENSIONS_MIME_TYPES.webp,
    ]

    return validExtensionsToPreview.includes(docuFile.mimeType);
}