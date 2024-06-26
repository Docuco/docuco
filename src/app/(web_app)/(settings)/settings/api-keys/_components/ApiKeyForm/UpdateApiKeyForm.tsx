import {
    Button,
    Checkbox,
    CopyButton,
    Fieldset,
    Group,
    Modal,
    SimpleGrid,
    Space,
    Text,
    TextInput,
    Textarea,
    Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Permission } from '../../../../../../_core/Shared/Domain/VOs/Permission';
import { useState } from 'react';
import { ApiKeyPrimitive } from '../../../../../../_core/Auth/Domain/Primitives/ApiKeyPrimitive';
import { clientCustomFetch } from '../../../../../_utils/fetch';
import { mutate } from 'swr';
import { API_ROUTES } from '../../../../../_utils/constants';
import { UpdateApiKeyDTO } from '../../../../../../_core/Auth/Application/DTOs/UpdateApiKeyDTO';
import { errorNotification, generalNotification } from '../../../../../_utils/notifications';
import { useTokenPayload } from '../../../../../_utils/_hooks/useTokenPayload';

export function UpdateApiKeyForm({
    apiKey,
    onClose,
    isOpened,
}:{
    apiKey: ApiKeyPrimitive
    onClose: () => void
    isOpened: boolean,
}) {
    const [nameLength, setNameLength] = useState(apiKey.name.length);
    const [descriptionLength, setDescriptionLength] = useState(apiKey.description?.length || 0);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isLoadingChangePermissions, setIsLoadingChangePermissions] = useState(false);
    const tokenPayload = useTokenPayload();

    const canUpdate = tokenPayload.permissions.includes('api_key:update')
    const canChangePermissions = tokenPayload.permissions.includes('api_key:change_permissions')

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

    updateForm.watch('name', ({ previousValue, value, touched, dirty }) => {
        setNameLength(value?.length || 0)
    });

    updateForm.watch('description', ({ previousValue, value, touched, dirty }) => {
        setDescriptionLength(value?.length || 0)
    });

    async function updateApiKey(data: UpdateApiKeyDTO) {
        setIsLoadingUpdate(true);
        await clientCustomFetch(`${API_ROUTES.API_KEY(apiKey.apiKeyValue)}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
        await generalNotification({ title: 'Api Key updated', message: `Api Key "${apiKey.name}" has been updated`})
        setIsLoadingUpdate(false);
    }

    async function changeApiKeyPermissions(data: { permissions: string[] }) {
        setIsLoadingChangePermissions(true);
        await clientCustomFetch(`${API_ROUTES.API_KEY_PERMISSIONS(apiKey.apiKeyValue)}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
        await generalNotification({ title: 'Permissions changed', message: `Permissions for the Api Key "${apiKey.name}" have been changed`})
        setIsLoadingChangePermissions(false);
    }

    async function onLocalClose() {
        setIsLoadingChangePermissions(false);
        setIsLoadingUpdate(false);
        await mutate(API_ROUTES.API_KEYS);
        onClose();
    }

    return (
        <>
            <Modal opened={isOpened} onClose={onLocalClose} size="xl" title="Update api key" centered overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}>
                <Tooltip.Floating label="You don't have permissions to change the api key" disabled={canUpdate}> 
                    <form onSubmit={updateForm.onSubmit(updateApiKey)}>
                            <TextInput
                                label="Api Key"
                                disabled
                                readOnly
                                value={apiKey.apiKeyValue}
                                rightSectionWidth='auto'
                                rightSection={
                                    <>
                                        <CopyButton value={apiKey.apiKeyValue}>
                                            {({ copied, copy }) => (
                                                <Button color={copied ? 'teal' : 'blue'} variant='light' onClick={copy}>
                                                    {copied ? 'Copied Api Key' : 'Copy Api Key'}
                                                </Button>
                                            )}
                                        </CopyButton>
                                    </>
                                }
                            />
                        <Space h="xl" />
                        <TextInput
                            withAsterisk
                            label="Name"
                            maxLength={50}
                            disabled={!canUpdate}
                            placeholder="My Api Key"
                            key={updateForm.key('name')}
                            {...updateForm.getInputProps('name')}
                        />
                        <Group justify='flex-end'>
                            <Text size='sm' c='dimmed'>{nameLength}/{50}</Text>
                        </Group>
                        <Space h="xl" />
                        <Textarea
                            withAsterisk
                            resize="vertical"
                            label="Description"
                            maxLength={250}
                            disabled={!canUpdate}
                            placeholder="Api key for my app..."
                            key={updateForm.key('description')}
                            {...updateForm.getInputProps('description')}
                        />
                        <Group justify='flex-end'>
                            <Text size='sm' c='dimmed'>{descriptionLength}/{250}</Text>
                        </Group>
                        <Group justify="flex-end" mt="md">
                            <Button type="submit" loading={isLoadingUpdate} disabled={!canUpdate}>Update Api Key</Button>
                        </Group>
                    </form>
                </Tooltip.Floating>

                <Space h="xl" />

                <Tooltip.Floating label="You don't have permissions to change the permissions" disabled={canChangePermissions}> 
                    <form onSubmit={permissionsForm.onSubmit(changeApiKeyPermissions)}>
                        <Fieldset legend="Permissions">
                            <Checkbox.Group
                                label=""
                                withAsterisk
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