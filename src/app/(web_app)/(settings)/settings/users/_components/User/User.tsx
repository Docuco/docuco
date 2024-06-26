import { ActionIcon, Card, CardSection, Group, Menu, MenuDropdown, MenuItem, MenuTarget, Space, Text, rem } from "@mantine/core";
import classes from './User.module.css'
import { IconDots, IconTransform, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { relativeTimeFormat } from "../../../../../_utils/relativeTimeFormat";
import { UserPrimitive } from "../../../../../../_core/Users/Domain/Primitives/UserPrimitive";
import { DeleteUserModal } from "./DeleteUserModal";
import { UpdateUserForm } from "../UserForm/UpdateUserForm";
import { useTokenPayload } from "../../../../../_utils/_hooks/useTokenPayload";

export function User({
    user,
}: {
    user: UserPrimitive
}) {
    const [isOpenedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [isOpenedUpdateModal, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
    const tokenPayload = useTokenPayload()
    const canDeleteUser = tokenPayload.permissions.includes('users:delete')
    const canChangePassowrd = tokenPayload.permissions.includes('users:change_password')
    const canChangePermissions = tokenPayload.permissions.includes('users:change_permissions')
    const canUpdate = canChangePassowrd || canChangePermissions

    return (
        <>
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={classes.card}
                onClick={openUpdateModal}
            >
                <CardSection inheritPadding py="xs">
                    <Group justify="space-between" align="center">
                        <Text fw={600}>{user.email}</Text>
                        {(canDeleteUser || canUpdate) && <Menu withinPortal position="bottom-end" shadow="sm">
                            <MenuTarget>
                                <ActionIcon variant="subtle" color="gray" onClick={(e) => e.stopPropagation()}>
                                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                            </MenuTarget>

                            <MenuDropdown>
                               {canUpdate && <MenuItem
                                    leftSection={<IconTransform color='teal' style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        openUpdateModal()
                                    }}
                                >
                                    Update
                                </MenuItem>}
                                {canDeleteUser && <MenuItem
                                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                    color="red"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        openDeleteModal()
                                    }}
                                >
                                    Delete
                                </MenuItem>}
                            </MenuDropdown>
                        </Menu>}
                    </Group>
                </CardSection>
                
                <Space h="sm" />

                <Card.Section px='xs' pb='xs'>
                    <Group justify='flex-end'>
                        <Text size='xs' c='dimmed'>created {relativeTimeFormat(user.createdAt)}</Text>
                    </Group>
                </Card.Section>
            </Card>

            <DeleteUserModal user={user} onClose={closeDeleteModal} isOpened={isOpenedDeleteModal} />
            <UpdateUserForm user={user} onClose={closeUpdateModal} isOpened={isOpenedUpdateModal} />
        </>
    );
}
