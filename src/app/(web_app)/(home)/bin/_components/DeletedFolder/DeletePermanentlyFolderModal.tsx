import { Button, Group, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { API_ROUTES } from "../../../../_utils/constants";
import { clientCustomFetch } from "../../../../_utils/fetch";
import { mutate } from "swr";
import { FolderPrimitive } from "../../../../../_core/Folders/Domain/Primitives/FolderPrimitive";

export function DeletePermanentlyFolderModal({
    folder,
    opened,
    onClose
}: {
    folder: FolderPrimitive,
    opened: boolean,
    onClose: () => void
}) {
    const [isDeletingFolder, setIsDeletingFolder] = useState(false);

    async function deletePermanentlyFolder() {
        setIsDeletingFolder(true);
        
        await clientCustomFetch(`${API_ROUTES.FOLDER_DELETED(folder.id)}`, {
            method: 'DELETE',
        })
        await mutate(API_ROUTES.FOLDERS_DELETED);
        
        setIsDeletingFolder(false);
        onClose();
    }

    return (
        <Modal opened={opened} onClose={close} title="Delete folder" centered overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
        }}>
            <Text>
                Are you sure you want to delete <strong>PERMANENTLY</strong> the folder?
            </Text>
            <Text c='dimmed'>
                This action cannot be undone.
            </Text>
            <Text fw={500} ta={'center'} size="xl">
                {folder.name}
            </Text>
            <Group mt="xl" justify="space-between">
                <Button onClick={onClose} variant="outline">Cancel</Button>
                <Button loading={isDeletingFolder} onClick={deletePermanentlyFolder} color="red" variant="outline">Delete</Button>
            </Group>
        </Modal>
    );
}
