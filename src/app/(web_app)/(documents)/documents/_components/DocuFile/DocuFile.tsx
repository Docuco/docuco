'use client'

import { ActionIcon, Card, CardSection, Center, Group, Menu, MenuDropdown, MenuItem, MenuTarget, Text, rem } from "@mantine/core";
import { DocuFilePrimitive } from "../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import classes from './DocuFile.module.css'
import { MIME_TYPES } from "@mantine/dropzone";
import { IconDots, IconDownload, IconEye, IconFileTypeCsv, IconFileTypeDoc, IconFileTypeDocx, IconFileTypePdf, IconFileTypeXls, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DeleteDocuFileModal } from "./DeleteDocuFileModal";

export function DocuFile({
    docuFile
}: {
    docuFile: DocuFilePrimitive
}) {
    const [isOpenedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

    const fileTypeIcon = getFileTypeIcon(docuFile.mimeType);

    function seeDocument() {
        window.open(docuFile.url, '_blank');
    }

    return (
        <>
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={classes.card}
                onDoubleClick={seeDocument}
            >
                <CardSection inheritPadding py="xs">
                    <Group justify="flex-end">
                        <Menu withinPortal position="bottom-end" shadow="sm">
                            <MenuTarget>
                                <ActionIcon variant="subtle" color="gray" onClick={(e) => e.stopPropagation()}>
                                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                            </MenuTarget>

                            <MenuDropdown>
                                <MenuItem
                                    leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}
                                    component="a"
                                    target="_blank"
                                    href={docuFile.url}
                                >
                                    Preview
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
                    <Text fw={500} lineClamp={2}>{docuFile.name}</Text>
                </Group>
            </Card>

            <DeleteDocuFileModal docuFile={docuFile} onClose={closeDeleteModal} opened={isOpenedDeleteModal}/>
        </>
    );
}

function getFileTypeIcon(mimeType: string): JSX.Element {
    const size = 32;
    const stroke = 1.3;

    const icons: { [key: string]: JSX.Element} = {
        [MIME_TYPES.csv]: <IconFileTypeCsv size={size} stroke={stroke} />,
        [MIME_TYPES.pdf]: <IconFileTypePdf size={size} stroke={stroke} />,
        [MIME_TYPES.doc]: <IconFileTypeDoc size={size} stroke={stroke} />,
        [MIME_TYPES.docx]: <IconFileTypeDocx size={size} stroke={stroke} />,
        [MIME_TYPES.xls]: <IconFileTypeXls size={size} stroke={stroke} />,
        [MIME_TYPES.xlsx]: <IconFileTypeXls size={size} stroke={stroke} />,
    }

    return icons[mimeType] || <IconFileTypeDoc />;
}
