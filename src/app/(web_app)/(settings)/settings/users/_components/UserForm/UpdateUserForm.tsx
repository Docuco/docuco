import {
    Button,
    Checkbox,
    Fieldset,
    Group,
    Modal,
    PasswordInput,
    SimpleGrid,
    Space,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Permission } from '../../../../../../_core/Shared/Domain/VOs/Permission';
import { useState } from 'react';
import { clientCustomFetch } from '../../../../../_utils/fetch';
import { mutate } from 'swr';
import { API_ROUTES } from '../../../../../_utils/constants';
import { errorNotification, generalNotification } from '../../../../../_utils/notifications';
import { UserPrimitive } from '../../../../../../_core/Users/Domain/Primitives/UserPrimitive';

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
        try {
            await clientCustomFetch(`${API_ROUTES.USER_CHANGE_PASSWORD(user.id)}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            })
            await generalNotification({ title: 'Password changed', message: `Password for the user "${user.email}" has been changed`})
        } catch (error) {
            await errorNotification({ title: 'Error changing password', message: (error as any).message });
        }
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
            await errorNotification({ title: 'Error changing permissions', message: (error as any).message });
        }
        permissionsForm.reset();
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
                <form onSubmit={passwordForm.onSubmit(changePasswordToUser)}>
                    <PasswordInput
                        withAsterisk
                        label="New Password"
                        placeholder="H@rdP@ssw0rd"
                        key={passwordForm.key('password')}
                        {...passwordForm.getInputProps('password')}
                    />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" loading={isLoadingChangePassword}>Change password</Button>
                    </Group>
                </form>

                <Space h="xl" />

                <form onSubmit={permissionsForm.onSubmit(changeUserPermissions)}>
                    <Fieldset legend="Permissions">
                        <Checkbox.Group
                            label=""
                            withAsterisk
                            {...permissionsForm.getInputProps('permissions')}
                        >
                            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
                                {Permission.ValidValues.map((permission) => (
                                    <Checkbox
                                        key={permission}
                                        value={permission}
                                        label={permission}
                                    />
                                ))}
                            </SimpleGrid>
                        </Checkbox.Group>
                    </Fieldset>
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" loading={isLoadingChangePermissions}>Change permissions</Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}