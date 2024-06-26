import {
    Button,
    Checkbox,
    Fieldset,
    Group,
    Modal,
    PasswordInput,
    SimpleGrid,
    Space,
    Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Permission } from '../../../../../../_core/Shared/Domain/VOs/Permission';
import { useState } from 'react';
import { clientCustomFetch } from '../../../../../_utils/fetch';
import { mutate } from 'swr';
import { API_ROUTES } from '../../../../../_utils/constants';
import { generalNotification } from '../../../../../_utils/notifications';
import { UserPrimitive } from '../../../../../../_core/Users/Domain/Primitives/UserPrimitive';
import { useTokenPayload } from '../../../../../_utils/_hooks/useTokenPayload';

export function UpdateUserForm({
    user,
    onClose,
    isOpened,
}:{
    user: UserPrimitive
    onClose: () => void
    isOpened: boolean,
}) {
    const [isLoadingChangePassword, setIsLoadingChangePassword] = useState(false);
    const [isLoadingChangePermissions, setIsLoadingChangePermissions] = useState(false);
    const tokenPayload = useTokenPayload();

    const canChangePassowrd = tokenPayload.permissions.includes('users:change_password')
    const canChangePermissions = tokenPayload.permissions.includes('users:change_permissions')

    const passwordForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            password: '',
        },
    });

    const permissionsForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            permissions: user.permissions,
        },
    });

    async function changePasswordToUser(data: { password: string }) {
        setIsLoadingChangePassword(true);
        await clientCustomFetch(`${API_ROUTES.USER_CHANGE_PASSWORD(user.id)}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
        await generalNotification({ title: 'Password changed', message: `Password for the user "${user.email}" has been changed`})
        passwordForm.reset();
        setIsLoadingChangePassword(false);
    }

    async function changeUserPermissions(data: { permissions: string[] }) {
        setIsLoadingChangePermissions(true);
        try {
            await clientCustomFetch(`${API_ROUTES.USER_CHANGE_PERMISSIONS(user.id)}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            })
            await generalNotification({ title: 'Permissions changed', message: `Permissions for the user "${user.email}" have been changed`})
        } catch (error) {
            permissionsForm.reset();
        }
        setIsLoadingChangePermissions(false);
    }

    async function onLocalClose() {
        setIsLoadingChangePassword(false);
        setIsLoadingChangePermissions(false);
        await mutate(API_ROUTES.USERS);
        onClose();
    }

    return (
        <>
            <Modal opened={isOpened} onClose={onLocalClose} size="xl" title="Update user" centered overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}>
                <Tooltip.Floating label="You don't have permissions to change the passwords" disabled={canChangePassowrd}> 
                    <form onSubmit={passwordForm.onSubmit(changePasswordToUser)}>
                        <PasswordInput
                            withAsterisk
                            label="New Password"
                            placeholder="H@rdP@ssw0rd"
                            disabled={!canChangePassowrd}
                            key={passwordForm.key('password')}
                            {...passwordForm.getInputProps('password')}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button type="submit" loading={isLoadingChangePassword} disabled={!canChangePassowrd}>Change password</Button>
                        </Group>
                    </form>
                </Tooltip.Floating>

                <Space h="xl" />

                <Tooltip.Floating label="You don't have permissions to change the permissions" disabled={canChangePermissions}> 
                    <form onSubmit={permissionsForm.onSubmit(changeUserPermissions)}>
                        <Fieldset legend="Permissions">
                            <Checkbox.Group
                                label=""
                                withAsterisk
                                key={permissionsForm.key('permissions')}
                                {...permissionsForm.getInputProps('permissions')}
                            >
                                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
                                    {Permission.ValidValues.map((permission) => (
                                        <Checkbox
                                            disabled={!canChangePermissions}
                                            key={permission}
                                            value={permission}
                                            label={permission}
                                        />
                                    ))}
                                </SimpleGrid>
                            </Checkbox.Group>
                        </Fieldset>
                        <Group justify="flex-end" mt="md">
                            <Button type="submit" loading={isLoadingChangePermissions} disabled={!canChangePermissions}>Change permissions</Button>
                        </Group>
                    </form>
                </Tooltip.Floating>
            </Modal>
        </>
    );
}