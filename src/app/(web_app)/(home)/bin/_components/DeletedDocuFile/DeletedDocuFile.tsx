'use client'

import { ActionIcon, Card, CardSection, Center, Group, Menu, MenuDropdown, MenuItem, MenuTarget, Text, rem } from "@mantine/core";
import { DocuFilePrimitive } from "../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import classes from './DeletedDocuFile.module.css'
import { IconDots, IconEye, IconFileShredder, IconRestore } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DeletePermanentlyDocuFileModal } from "./DeletePermanentlyDocuFileModal";
import { mutate } from "swr";
import { clientCustomFetch } from "../../../../_utils/fetch";
import { API_ROUTES } from "../../../../_utils/constants";
import { getFileTypeIcon } from "../../../../_utils/getFileTypeIcon";

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
        await mutate(API_ROUTES.DOCUMENTS_DELETED);
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
                                    leftSection={<IconEye color='indigo' style={{ width: rem(14), height: rem(14) }} />}
                                    component="a"
                                    target="_blank"
                                    href={docuFile.url}
                                >
                                    Preview
                                </MenuItem>
                                <MenuItem
                                    leftSection={<IconRestore color="green" style={{ width: rem(14), height: rem(14) }} />}
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