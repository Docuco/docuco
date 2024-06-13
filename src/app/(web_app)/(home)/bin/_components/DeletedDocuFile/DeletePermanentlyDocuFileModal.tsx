import { Button, Group, Modal, Text } from "@mantine/core";
import { DocuFilePrimitive } from "../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { useState } from "react";
import { API_ROUTES } from "../../../../_utils/constants";
import { clientCustomFetch } from "../../../../_utils/fetch";
import { mutate } from "swr";

export function DeletePermanentlyDocuFileModal({
    docuFile,
    opened,
    onClose
}: {
    docuFile: DocuFilePrimitive,
    opened: boolean,
    onClose: () => void
}) {
    const [isDeletingDocuFile, setIsDeletingDocuFile] = useState(false);

    async function deletePermanentlyDocuFile() {
        setIsDeletingDocuFile(true);
        
        await clientCustomFetch(`${API_ROUTES.DOCUMENT_DELETED(docuFile.id)}`, {
            method: 'DELETE',
        })
        await mutate(API_ROUTES.DOCUMENTS_DELETED);
        
        setIsDeletingDocuFile(false);
        onClose();
    }

    return (
        <Modal opened={opened} onClose={close} title="Delete document" centered overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
        }}>
            <Text>
                Are you sure you want to delete <strong>PERMANENTLY</strong> the document?
            </Text>
            <Text c='dimmed'>
                This action cannot be undone.
            </Text>
            <Text fw={500} ta={'center'} size="xl">
                {docuFile.name}
            </Text>
            <Group mt="xl" justify="space-between">
                <Button onClick={onClose} variant="outline">Cancel</Button>
                <Button loading={isDeletingDocuFile} onClick={deletePermanentlyDocuFile} color="red" variant="outline">Delete</Button>
            </Group>
        </Modal>
    );
}
