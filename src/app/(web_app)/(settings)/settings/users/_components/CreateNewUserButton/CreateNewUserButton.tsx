'use client'

import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CreateUserForm } from '../UserForm/CreateUserForm';

export function CreateNewUserButton() {
    const [isOpened, {open, close}] = useDisclosure();

    return (
        <>
            <Button variant="outline" onClick={open}>
                Create new user
            </Button>

            <CreateUserForm isOpened={isOpened} onClose={close}/>
        </>
    );
}