import {
    Button,
    Checkbox,
    Fieldset,
    Group,
    Modal,
    SimpleGrid,
    Space,
    TextInput,
    Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { getCookie } from 'cookies-next';
import { Token } from '../../../../../../_core/Auth/Domain/VOs/Token';
import { UserTokenPayload } from '../../../../../../_core/Auth/Domain/VOs/UserToken';
import { Permission } from '../../../../../../_core/Shared/Domain/VOs/Permission';
import { useState } from 'react';
import { ApiKeyPrimitive } from '../../../../../../_core/Auth/Domain/Primitives/ApiKeyPrimitive';
import { CreateApiKeyDTO } from '../../../../../../_core/Auth/Application/DTOs/CreateApiKeyDTO';
import { clientCustomFetch } from '../../../../../_utils/fetch';
import { mutate } from 'swr';
import { API_ROUTES } from '../../../../../_utils/constants';
import { UpdateApiKeyDTO } from '../../../../../../_core/Auth/Application/DTOs/UpdateApiKeyDTO';

export function UpdateApiKeyForm({
    apiKey,
    onClose,
    isOpened,
}:{
    apiKey: ApiKeyPrimitive
    onClose: () => void
    isOpened: boolean,
}) {
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isLoadingChangePermissions, setIsLoadingChangePermissions] = useState(false);

    const updateForm = useForm<UpdateApiKeyDTO>({
        mode: 'uncontrolled',
        initialValues: {
            name: apiKey.name,
            description: apiKey.description,
        },
    });

    const permissionsForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            permissions: apiKey.permissions,
        },
    });

    async function updateApiKey(data: UpdateApiKeyDTO) {
        setIsLoadingUpdate(true);
        await clientCustomFetch(`${API_ROUTES.API_KEY(apiKey.apiKeyValue)}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
        await mutate(API_ROUTES.API_KEYS);
        setIsLoadingUpdate(false);
        onClose();
    }

    async function changeApiKeyPermissions(data: { permissions: string[] }) {
        setIsLoadingChangePermissions(true);
        await clientCustomFetch(`${API_ROUTES.API_KEY_PERMISSIONS(apiKey.apiKeyValue)}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
        await mutate(API_ROUTES.API_KEYS);
        setIsLoadingChangePermissions(false);
        onClose();
    }

    return (
        <>
            <Modal opened={isOpened} onClose={onClose} size="lg" title="Update api key" centered overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}>
                <form onSubmit={updateForm.onSubmit(updateApiKey)}>
                    <TextInput
                        withAsterisk
                        label="Name"
                        placeholder="My Api Key"
                        key={updateForm.key('name')}
                        {...updateForm.getInputProps('name')}
                    />
                    <Space h="xl" />
                    <Textarea
                        withAsterisk
                        resize="vertical"
                        label="Description"
                        placeholder="Api key for my app..."
                        key={updateForm.key('description')}
                        {...updateForm.getInputProps('description')}
                    />
                    <Space h="xl" />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" loading={isLoadingUpdate}>Update Api Key</Button>
                    </Group>
                </form>

                <form onSubmit={permissionsForm.onSubmit(changeApiKeyPermissions)}>
                    <Fieldset legend="Permissions">
                        <Checkbox.Group
                            label="Select the permissions for this api key"
                            withAsterisk
                            {...permissionsForm.getInputProps('permissions')}
                        >
                            <SimpleGrid cols={2} spacing="xl">
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
                        <Button type="submit" loading={isLoadingChangePermissions}>Change permissions</Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}