import { Button, Group, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { API_ROUTES } from "../../../../_utils/constants";
import { clientCustomFetch } from "../../../../_utils/fetch";
import { mutate } from "swr";
import { FolderPrimitive } from "../../../../../_core/Folders/Domain/Primitives/FolderPrimitive";

export function DeleteFolderModal({
    folder,
    folderParentId,
    opened,
    onClose
}: {
    folder: FolderPrimitive,
    folderParentId: string | null,
    opened: boolean,
    onClose: () => void
}) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteFolder() {
        setIsDeleting(true);
        
        await clientCustomFetch(`${API_ROUTES.FOLDER(folder.id)}`, {
            method: 'DELETE',
        })
        if (folderParentId) {
            await mutate(API_ROUTES.FOLDER(folderParentId));
        } else {
            await mutate(API_ROUTES.FOLDERS);
        }
        
        setIsDeleting(false);
        onClose();
    }

    return (
        <Modal opened={opened} onClose={onClose} title="Delete folder" centered overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
        }}>
            <Text>
                Are you sure you want to delete the folder?
            </Text>
            <Text fw={500} ta={'center'} size="xl">
                {folder.name}
            </Text>
            <Group mt="xl" justify="space-between">
                <Button onClick={onClose} variant="outline">Cancel</Button>
                <Button loading={isDeleting} onClick={deleteFolder} color="red" variant="outline">Delete</Button>
            </Group>
        </Modal>
    );
}
