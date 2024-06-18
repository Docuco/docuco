import {
    Button,
    Checkbox,
    Fieldset,
    Group,
    Modal,
    PasswordInput,
    SimpleGrid,
    Space,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Permission } from '../../../../../../_core/Shared/Domain/VOs/Permission';
import { useState } from 'react';
import { clientCustomFetch } from '../../../../../_utils/fetch';
import { mutate } from 'swr';
import { API_ROUTES } from '../../../../../_utils/constants';
import { CreateUserDTO } from '../../../../../../_core/Users/Application/DTOs/CreateUserDTO';
import { errorNotification } from '../../../../../_utils/notifications';

type CreateUserAuthDTO = CreateUserDTO & { password: string };

export function CreateUserForm({
    onClose,
    isOpened,
}:{
    onClose: () => void
    isOpened: boolean,
}) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<CreateUserAuthDTO>({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
            permissions: [],
        },
    });

    async function createApiKey(data: CreateUserAuthDTO) {
        setIsLoading(true);
        await clientCustomFetch(`${API_ROUTES.USERS}`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        await mutate(API_ROUTES.USERS);
        setIsLoading(false);
        onLocalClose();
    }

    function onLocalClose() {
        setIsLoading(false);
        form.reset();
        onClose();
    }

    return (
        <>
            <Modal opened={isOpened} onClose={onLocalClose} size="xl" title="Add new user" centered overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}>
                <form onSubmit={form.onSubmit(createApiKey)}>
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="admin@admin.com"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <Space h="xl" />
                    <PasswordInput
                        withAsterisk
                        label="Password"
                        placeholder="H@rdP@ssw0rd"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                    <Space h="xl" />

                    <Fieldset legend="Permissions">
                        <Checkbox.Group
                            label=""
                            withAsterisk
                            {...form.getInputProps('permissions')}
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
                    <Space h="xl" />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" loading={isLoading}>Create user</Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}