import { ActionIcon, Card, CardSection, Center, Group, Menu, MenuDropdown, MenuItem, MenuTarget, Popover, Text, Tooltip, rem } from "@mantine/core";
import { DocuFilePrimitive } from "../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import classes from './DocuFile.module.css'
import { MIME_TYPES } from "@mantine/dropzone";
import { IconDots, IconEye, IconFileTypeCsv, IconFileTypeDoc, IconFileTypeDocx, IconFileTypePdf, IconFileTypeXls, IconShare, IconTrash } from "@tabler/icons-react";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { DeleteDocuFileModal } from "./DeleteDocuFileModal";
import { ShareDocuFileModal, buildShareURL } from "./ShareDocuFileModal";
import { API_ROUTES } from "../../../../_utils/constants";
import { mutate } from "swr";
import { DocuMimeTypeType } from "../../../../../_core/Documents/Domain/VOs/DocuMimeType";

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

    const fileTypeIcon = getFileTypeIcon(docuFile.mimeType);

    return (
        <>
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={classes.card}
                onDoubleClick={() => onPreview(docuFile)}
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
                                <MenuItem
                                    leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => onPreview(docuFile)}
                                >
                                    Preview
                                </MenuItem>
                                <MenuItem
                                    leftSection={<IconShare style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => openShareModal()}
                                >
                                    Share
                                </MenuItem>
                                <MenuItem
                                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                    color="red"
                                    onClick={openDeleteModal}
                                >
                                    Delete
                                </MenuItem>
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

function getFileTypeIcon(mimeType: DocuMimeTypeType): JSX.Element {
    const size = 32;
    const stroke = 1.3;

    const icons: { [key in DocuMimeTypeType]: JSX.Element} = {
        [MIME_TYPES.csv]: <IconFileTypeCsv size={size} stroke={stroke} />,
        [MIME_TYPES.pdf]: <IconFileTypePdf size={size} stroke={stroke} />,
        [MIME_TYPES.doc]: <IconFileTypeDoc size={size} stroke={stroke} />,
        [MIME_TYPES.docx]: <IconFileTypeDocx size={size} stroke={stroke} />,
        [MIME_TYPES.xls]: <IconFileTypeXls size={size} stroke={stroke} />,
        [MIME_TYPES.xlsx]: <IconFileTypeXls size={size} stroke={stroke} />,
    }

    return icons[mimeType] || <IconFileTypeDoc />;
}
