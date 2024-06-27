'use client'

import { ActionIcon, Box, Card, CardSection, Group, Menu, MenuDropdown, MenuItem, MenuTarget, Text, rem } from "@mantine/core";
import classes from './DeletedFolder.module.css'
import { IconDots, IconFileShredder, IconFolder, IconRestore } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DeletePermanentlyFolderModal } from "./DeletePermanentlyFolderModal";
import { mutate } from "swr";
import { clientCustomFetch } from "../../../../_utils/fetch";
import { API_ROUTES } from "../../../../_utils/constants";
import { useTokenPayload } from "../../../../_utils/_hooks/useTokenPayload";
import { FolderPrimitive } from "../../../../../_core/Folders/Domain/Primitives/FolderPrimitive";
import { useRouter } from "next/navigation";

export function DeletedFolder({
    folder
}: {
    folder: FolderPrimitive
}) {
    const router = useRouter();

    const [isOpenedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

    const tokenPayload = useTokenPayload()

    const canDelete = tokenPayload.permissions.includes('folders:delete')
    const canRestore = tokenPayload.permissions.includes('folders:restore')

    async function restore() {
        await clientCustomFetch(`${API_ROUTES.FOLDER_RESTORE(folder.id)}`, {
            method: 'POST',
        })
        await mutate(API_ROUTES.FOLDERS);
        await mutate(API_ROUTES.FOLDERS_DELETED);
    }

    return (
        <>
            <Card
                shadow="sm"
                radius="md"
                withBorder
                p={'xs'}
                className={classes.card}
                onDoubleClick={() => {
                    router.push(`/bin/folders/${folder.id}`)
                }}
            >
                <CardSection inheritPadding py="md" px='md'>
                    <Group justify="space-between" gap={0} wrap="nowrap">
                        <Group gap={10} wrap="nowrap" maw={'88%'}>
                            <IconFolder size={16} stroke={1.3} />
                            <Box maw={'87%'}>
                                <Text fw={500} truncate="end">{folder.name}</Text>
                            </Box>
                        </Group>
                        <Menu withinPortal position="bottom-end" shadow="sm">
                            <MenuTarget>
                                <ActionIcon variant="subtle" color="gray" onClick={(e) => e.stopPropagation()}>
                                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                            </MenuTarget>

                            <MenuDropdown>
                                {canRestore && <MenuItem
                                    leftSection={<IconRestore color="green" style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={restore}
                                >
                                    Restore
                                </MenuItem>}
                                {canDelete && <MenuItem
                                    leftSection={<IconFileShredder style={{ width: rem(14), height: rem(14) }} />}
                                    color="red"
                                    onClick={openDeleteModal}
                                >
                                    Delete permanently
                                </MenuItem>}
                            </MenuDropdown>
                        </Menu>
                    </Group>
                </CardSection>
            </Card>

            <DeletePermanentlyFolderModal folder={folder} onClose={closeDeleteModal} opened={isOpenedDeleteModal}/>
        </>
    );
}