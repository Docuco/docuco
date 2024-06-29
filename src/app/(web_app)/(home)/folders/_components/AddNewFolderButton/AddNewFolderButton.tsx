'use client'

import {
    Button,
    Group,
    Modal,
    Space,
    Text,
    TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import classes from './AddNewFolderButton.module.css';
import { mutate } from 'swr';
import { API_ROUTES } from '../../../../_utils/constants';
import { clientCustomFetch } from '../../../../_utils/fetch';
import { useForm } from '@mantine/form';
import { CreateFolderDTO } from '../../../../../_core/Folders/Application/DTOs/CreateFolderDTO';

export function AddNewFolderButton({
    parentFolderId
}: {
    parentFolderId: string | null
}) {
    const [isOpened, { open, close }] = useDisclosure(false);

    const [isLoading, setIsLoading] = useState(false);
    const [nameLength, setNameLength] = useState(0);

    const form = useForm<CreateFolderDTO>({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            parentFolderId,
        },
    });

    form.watch('name', ({ previousValue, value, touched, dirty }) => {
        setNameLength(value?.length || 0)
    });

    async function createFolder(data: CreateFolderDTO) {
        setIsLoading(true);

        await clientCustomFetch(`${API_ROUTES.FOLDERS}`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        if (parentFolderId) {
            await mutate(API_ROUTES.FOLDER(parentFolderId));
        } else {
            await mutate(API_ROUTES.FOLDERS);
        }
        form.reset();
        setNameLength(0);
        setIsLoading(false);
        close();
    }

    return (
        <>
            <Button variant="outline" onClick={open}>
                Create folder
            </Button>

            <Modal opened={isOpened} onClose={close} title="Create new folder" centered overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}>
                <form onSubmit={form.onSubmit(createFolder)}>
                    <TextInput
                        withAsterisk
                        label="Name"
                        maxLength={50}
                        placeholder="My folder"
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />
                    <Group justify='flex-end'>
                        <Text size='sm' c='dimmed'>{nameLength}/{50}</Text>
                    </Group>
                    <Space h="xl" />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" loading={isLoading}>Create folder</Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}