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

export function CreateApiKeyForm({
    apiKey,
    onClose,
    isOpened,
}:{
    apiKey?: ApiKeyPrimitive
    onClose: () => void
    isOpened: boolean,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const token = getCookie('token')!;

    const form = useForm<CreateApiKeyDTO>({
        mode: 'uncontrolled',
        initialValues: {
            name: apiKey?.name || '',
            creatorId: apiKey?.creatorId || Token.extractPayload<UserTokenPayload>(token).userId,
            description: apiKey?.description || '',
            permissions: apiKey?.permissions || [],
        },
    });

    async function createApiKey(data: CreateApiKeyDTO) {
        setIsLoading(true);
        await clientCustomFetch(`${API_ROUTES.API_KEYS}`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        await mutate(API_ROUTES.API_KEYS);
        setIsLoading(false);
        onClose();
    }

    return (
        <>
            <Modal opened={isOpened} onClose={onClose} size="lg" title="Add new api key" centered overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}>
                <form onSubmit={form.onSubmit(createApiKey)}>
                    <TextInput
                        label="Creator ID"
                        disabled
                        readOnly
                        key={form.key('creatorId')}
                        {...form.getInputProps('creatorId')}
                    />
                    <Space h="xl" />
                    <TextInput
                        withAsterisk
                        label="Name"
                        placeholder="My Api Key"
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />
                    <Space h="xl" />
                    <Textarea
                        withAsterisk
                        resize="vertical"
                        label="Description"
                        placeholder="Api key for my app..."
                        key={form.key('description')}
                        {...form.getInputProps('description')}
                    />
                    <Space h="xl" />

                    <Fieldset legend="Permissions">
                        <Checkbox.Group
                            label="Select the permissions for this api key"
                            withAsterisk
                            {...form.getInputProps('permissions')}
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
                        <Button type="submit" loading={isLoading}>Create Api Key</Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}