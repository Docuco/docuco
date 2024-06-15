import { Button, Group, Modal, Space, Text } from "@mantine/core";
import { useState } from "react";
import { mutate } from "swr";
import { ApiKeyPrimitive } from "../../../../../../_core/Auth/Domain/Primitives/ApiKeyPrimitive";
import { clientCustomFetch } from "../../../../../_utils/fetch";
import { API_ROUTES } from "../../../../../_utils/constants";

export function RegenerateApiKeyModal({
    apiKey,
    isOpened,
    onClose
}: {
    apiKey: ApiKeyPrimitive,
    isOpened: boolean,
    onClose: () => void
}) {
    const [isLoading, setIsLoading] = useState(false);

    async function regenerateApiKey() {
        setIsLoading(true);
        
        await clientCustomFetch(`${API_ROUTES.API_KEY_REGENERATE(apiKey.apiKeyValue)}`, {
            method: 'PUT',
        })
        await mutate(API_ROUTES.API_KEYS);
        
        setIsLoading(false);
        onClose();
    }

    return (
        <Modal opened={isOpened} onClose={onClose} title="Regenerate api key" centered overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
        }}>
            <Text>
                Are you sure you want to regenerate the api key?
            </Text>
            <Text fw={500} ta={'center'} size="xl">
                {apiKey.name}
            </Text>
            <Space h="lg" />
            <Text size="sm" c='dimmed'>
                This will delete the current api key and generate a new one. The old key will no longer be valid and you will need to update it in your applications.
            </Text>
            <Group mt="xl" justify="space-between">
                <Button onClick={onClose} variant="outline">Cancel</Button>
                <Button loading={isLoading} onClick={regenerateApiKey} color="orange" variant="outline">Regenerate</Button>
            </Group>
        </Modal>
    );
}
