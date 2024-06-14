'use client'

import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CreateApiKeyForm } from '../ApiKeyForm/CreateApiKeyForm';

export function AddNewApiKeyButton() {
    const [isOpened, {open, close}] = useDisclosure();

    return (
        <>
            <Button variant="outline" onClick={open}>
                Add new api key
            </Button>

            <CreateApiKeyForm isOpened={isOpened} onClose={close}/>
        </>
    );
}