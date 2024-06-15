'use client'

import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CreateApiKeyForm } from '../ApiKeyForm/CreateApiKeyForm';

export function CreateNewApiKeyButton() {
    const [isOpened, {open, close}] = useDisclosure();

    return (
        <>
            <Button variant="outline" onClick={open}>
                Create new Api Key
            </Button>

            <CreateApiKeyForm isOpened={isOpened} onClose={close}/>
        </>
    );
}