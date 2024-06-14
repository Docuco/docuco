import { Button, Group, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { mutate } from "swr";
import { ApiKeyPrimitive } from "../../../../../../_core/Auth/Domain/Primitives/ApiKeyPrimitive";
import { clientCustomFetch } from "../../../../../_utils/fetch";
import { API_ROUTES } from "../../../../../_utils/constants";

export function DeleteApiKeyModal({
    apiKey,
    opened,
    onClose
}: {
    apiKey: ApiKeyPrimitive,
    opened: boolean,
    onClose: () => void
}) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteApiKey() {
        setIsDeleting(true);
        
        await clientCustomFetch(`${API_ROUTES.API_KEY(apiKey.apiKeyValue)}`, {
            method: 'DELETE',
        })
        await mutate(API_ROUTES.API_KEYS);
        
        setIsDeleting(false);
        onClose();
    }

    return (
        <Modal opened={opened} onClose={onClose} title="Delete api key" centered overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
        }}>
            <Text>
                Are you sure you want to delete the api key?
            </Text>
            <Text fw={500} ta={'center'} size="xl">
                {apiKey.name}
            </Text>
            <Group mt="xl" justify="space-between">
                <Button onClick={onClose} variant="outline">Cancel</Button>
                <Button loading={isDeleting} onClick={deleteApiKey} color="red" variant="outline">Delete</Button>
            </Group>
        </Modal>
    );
}
