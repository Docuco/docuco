import { ActionIcon, Box, Card, CardSection, Group, Menu, MenuDropdown, MenuItem, MenuTarget, Text, rem } from "@mantine/core";
import classes from './Folder.module.css'
import { IconDots, IconFolder, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DeleteFolderModal } from "./DeleteFolderModal";
import { useTokenPayload } from "../../../../_utils/_hooks/useTokenPayload";
import { FolderPrimitive } from "../../../../../_core/Folders/Domain/Primitives/FolderPrimitive";
import { useRouter } from "next/navigation";

export function Folder({
    folder,
    parentFolderId,
    onClick,
}: {
    folder: FolderPrimitive,
    parentFolderId: string | null,
    onClick: (folder: FolderPrimitive) => void
}) {
    const router = useRouter();

    const [isOpenedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    // const [isOpenedShareModal, { open: openShareModal, close: closeShareModal }] = useDisclosure(false);
    // const clipboard = useClipboard({ timeout: 1000 });

    const tokenPayload = useTokenPayload()

    const canDelete = tokenPayload.permissions.includes('folders:delete')
    // const canShare = tokenPayload.permissions.includes('folders:share')
    
    return (
        <>
            <Card
                shadow="sm"
                radius="md"
                withBorder
                p={'xs'}
                className={classes.card}
                onDoubleClick={() => {
                    router.push(`/folders/${folder.id}`)
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
                                {/* {canShare && <MenuItem
                                    leftSection={<IconShare color='lightseagreen' style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => openShareModal()}
                                >
                                    Share
                                </MenuItem>} */}
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
            </Card>

            <DeleteFolderModal folder={folder} parentFolderId={parentFolderId} onClose={closeDeleteModal} opened={isOpenedDeleteModal} />            
        </>
    );
}
