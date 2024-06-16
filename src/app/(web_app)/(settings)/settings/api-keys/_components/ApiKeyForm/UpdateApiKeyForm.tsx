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
        try {
            await clientCustomFetch(`${API_ROUTES.API_KEY(apiKey.apiKeyValue)}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            })
            await generalNotification({ title: 'Api Key updated', message: `Api Key "${apiKey.name}" has been updated`})
        } catch (error) {
            await errorNotification({ title: 'Error updating Api Key', message: (error as any).message });
        }
        setIsLoadingUpdate(false);
    }

    async function changeApiKeyPermissions(data: { permissions: string[] }) {
        setIsLoadingChangePermissions(true);
        try {
            await clientCustomFetch(`${API_ROUTES.API_KEY_PERMISSIONS(apiKey.apiKeyValue)}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            })
            await generalNotification({ title: 'Permissions changed', message: `Permissions for the Api Key "${apiKey.name}" have been changed`})
        } catch (error) {
            await errorNotification({ title: 'Error changing permissions', message: (error as any).message });
        }
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
                        placeholder="Api key for my app..."
                        key={updateForm.key('description')}
                        {...updateForm.getInputProps('description')}
                    />
                    <Group justify='flex-end'>
                        <Text size='sm' c='dimmed'>{descriptionLength}/{250}</Text>
                    </Group>
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" loading={isLoadingUpdate}>Update Api Key</Button>
                    </Group>
                </form>

                <Space h="xl" />

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