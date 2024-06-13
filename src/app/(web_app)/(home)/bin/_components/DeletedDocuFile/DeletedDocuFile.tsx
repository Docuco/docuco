'use client'

import { ActionIcon, Card, CardSection, Center, Group, Menu, MenuDropdown, MenuItem, MenuTarget, Text, rem } from "@mantine/core";
import { DocuFilePrimitive } from "../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import classes from './DeletedDocuFile.module.css'
import { MIME_TYPES } from "@mantine/dropzone";
import { IconDots, IconDownload, IconEye, IconFileShredder, IconFileTypeCsv, IconFileTypeDoc, IconFileTypeDocx, IconFileTypePdf, IconFileTypeXls, IconRestore, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DeletePermanentlyDocuFileModal } from "./DeletePermanentlyDocuFileModal";
import { mutate } from "swr";
import { clientCustomFetch } from "../../../../_utils/fetch";
import { API_ROUTES } from "../../../../_utils/constants";

export function DeletedDocuFile({
    docuFile
}: {
    docuFile: DocuFilePrimitive
}) {
    const [isOpenedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

    const fileTypeIcon = getFileTypeIcon(docuFile.mimeType);

    async function restore() {
        await clientCustomFetch(`${API_ROUTES.DOCUMENT_RESTORE(docuFile.id)}`, {
            method: 'POST',
        })
        await mutate(API_ROUTES.DOCUMENTS);
    }

    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
                <CardSection inheritPadding py="xs">
                    <Group justify="flex-end">
                        <Menu withinPortal position="bottom-end" shadow="sm">
                            <MenuTarget>
                                <ActionIcon variant="subtle" color="gray">
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
                                    leftSection={<IconRestore style={{ width: rem(14), height: rem(14) }} />}
                                    color="green"
                                    onClick={restore}
                                >
                                    Restore
                                </MenuItem>
                                <MenuItem
                                    leftSection={<IconFileShredder style={{ width: rem(14), height: rem(14) }} />}
                                    color="red"
                                    onClick={openDeleteModal}
                                >
                                    Delete permanently
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

            <DeletePermanentlyDocuFileModal docuFile={docuFile} onClose={closeDeleteModal} opened={isOpenedDeleteModal}/>
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
