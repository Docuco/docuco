import {
    Button,
    Checkbox,
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
import { getCookie } from 'cookies-next';
import { Token } from '../../../../../../_core/Auth/Domain/VOs/Token';
import { UserTokenPayload } from '../../../../../../_core/Auth/Domain/VOs/UserToken';
import { Permission } from '../../../../../../_core/Shared/Domain/VOs/Permission';
import { useState } from 'react';
import { CreateApiKeyDTO } from '../../../../../../_core/Auth/Application/DTOs/CreateApiKeyDTO';
import { clientCustomFetch } from '../../../../../_utils/fetch';
import { mutate } from 'swr';
import { API_ROUTES } from '../../../../../_utils/constants';

export function CreateApiKeyForm({
    onClose,
    isOpened,
}:{
    onClose: () => void
    isOpened: boolean,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [nameLength, setNameLength] = useState(0);
    const [descriptionLength, setDescriptionLength] = useState(0);

    const form = useForm<CreateApiKeyDTO>({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            creatorId: '',
            description: '',
            permissions: [],
        },
    });

    form.watch('name', ({ previousValue, value, touched, dirty }) => {
        setNameLength(value?.length || 0)
    });

    form.watch('description', ({ previousValue, value, touched, dirty }) => {
        setDescriptionLength(value?.length || 0)
    });

    async function createApiKey(data: CreateApiKeyDTO) {
        setIsLoading(true);
        await clientCustomFetch(`${API_ROUTES.API_KEYS}`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        await mutate(API_ROUTES.API_KEYS);
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
            <Modal opened={isOpened} onClose={onLocalClose} size="xl" title="Add new api key" centered overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}>
                <form onSubmit={form.onSubmit(createApiKey)}>
                    <TextInput
                        withAsterisk
                        label="Name"
                        maxLength={50}
                        placeholder="My Api Key"
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />
                    <Group justify='flex-end'>
                        <Text size='sm' c='dimmed'>{nameLength}/{50}</Text>
                    </Group>
                    <Space h="xl" />
                    <Textarea
                        withAsterisk
                        resize="vertical"
                        autosize
                        label="Description"
                        maxLength={250}
                        placeholder="Api key for my app..."
                        key={form.key('description')}
                        {...form.getInputProps('description')}
                    />
                    <Group justify='flex-end'>
                        <Text size='sm' c='dimmed'>{descriptionLength}/{250}</Text>
                    </Group>
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
                        <Button type="submit" loading={isLoading}>Create Api Key</Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}