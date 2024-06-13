import { Button, Group, Modal, Space, Text } from "@mantine/core";
import { DocuFilePrimitive } from "../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { useState } from "react";
import { API_ROUTES } from "../../../../_utils/constants";
import { clientCustomFetch } from "../../../../_utils/fetch";
import { mutate } from "swr";

export function StopSharingDocuFileModal({
    docuFile,
    opened,
    onClose
}: {
    docuFile: DocuFilePrimitive,
    opened: boolean,
    onClose: () => void
}) {
    const [isStoppingSharing, setIsStoppingSharing] = useState(false);

    async function stopSharing() {
        setIsStoppingSharing(true);

        await clientCustomFetch(`${API_ROUTES.DOCUMENT_SHARE(docuFile.id)}`, {
            method: 'DELETE',
        })
        await mutate(API_ROUTES.DOCUMENTS);
        
        setIsStoppingSharing(false);
        onClose();
    }

    return (
        <Modal opened={opened} onClose={onClose} title="Link to share" centered overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
        }}>
            <Text>
                Are you sure you want to stop sharing the document?
            </Text>
            <Space h="lg" />
            <Text fw={500} ta={'center'} size="xl">
                {docuFile.name}.{docuFile.extension}
            </Text>
            <Space h="lg" />
            <Text c='dimmed'>
                All the people with the link will not be able to access the document anymore.
            </Text>
            <Space h="lg" />
            <Group mt="xl" justify="space-between">
                <Button onClick={onClose} variant="outline">Cancel</Button>
                <Button loading={isStoppingSharing} onClick={stopSharing} color="red" variant="outline">Stop sharing</Button>
            </Group>
        </Modal>
    );
}
