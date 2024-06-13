import { Button, Group, Modal, Text } from "@mantine/core";
import { DocuFilePrimitive } from "../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { useState } from "react";
import { API_ROUTES } from "../../../../_utils/constants";
import { clientCustomFetch } from "../../../../_utils/fetch";
import { mutate } from "swr";

export function DeleteDocuFileModal({
    docuFile,
    opened,
    onClose
}: {
    docuFile: DocuFilePrimitive,
    opened: boolean,
    onClose: () => void
}) {
    const [isDeletingDocuFile, setIsDeletingDocuFile] = useState(false);

    async function deleteDocuFile() {
        setIsDeletingDocuFile(true);
        
        await clientCustomFetch(`${API_ROUTES.DOCUMENT(docuFile.id)}`, {
            method: 'DELETE',
        })
        await mutate(API_ROUTES.DOCUMENTS);
        
        setIsDeletingDocuFile(false);
        onClose();
    }

    return (
        <Modal opened={opened} onClose={onClose} title="Delete document" centered overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
        }}>
            <Text>
                Are you sure you want to delete the document?
            </Text>
            <Text fw={500} ta={'center'} size="xl">
                {docuFile.name}
            </Text>
            <Group mt="xl" justify="space-between">
                <Button onClick={onClose} variant="outline">Cancel</Button>
                <Button loading={isDeletingDocuFile} onClick={deleteDocuFile} color="red" variant="outline">Delete</Button>
            </Group>
        </Modal>
    );
}
