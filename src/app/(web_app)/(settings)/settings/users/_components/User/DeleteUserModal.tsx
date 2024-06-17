import { Button, Group, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { mutate } from "swr";
import { clientCustomFetch } from "../../../../../_utils/fetch";
import { API_ROUTES } from "../../../../../_utils/constants";
import { UserPrimitive } from "../../../../../../_core/Users/Domain/Primitives/UserPrimitive";
import { errorNotification } from "../../../../../_utils/notifications";

export function DeleteUserModal({
    user,
    isOpened,
    onClose
}: {
    user: UserPrimitive,
    isOpened: boolean,
    onClose: () => void
}) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteUser() {
        setIsDeleting(true);
        await clientCustomFetch(`${API_ROUTES.USER(user.id)}`, {
            method: 'DELETE',
        })
        await mutate(API_ROUTES.USERS);
        setIsDeleting(false);
        onClose();
    }

    return (
        <Modal opened={isOpened} onClose={onClose} title="Delete user" centered overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
        }}>
            <Text>
                Are you sure you want to delete the user?
            </Text>
            <Text fw={500} ta={'center'} size="xl">
                {user.email}
            </Text>
            <Group mt="xl" justify="space-between">
                <Button onClick={onClose} variant="outline">Cancel</Button>
                <Button loading={isDeleting} onClick={deleteUser} color="red" variant="outline">Delete</Button>
            </Group>
        </Modal>
    );
}
