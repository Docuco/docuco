import { Button, Center, CopyButton, Group, Input, Loader, Modal, Space, Text } from "@mantine/core";
import { DocuFilePrimitive } from "../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { useEffect, useState } from "react";
import { API_ROUTES } from "../../../../_utils/constants";
import { customFetch } from "../../../../_utils/fetch";
import { mutate } from "swr";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { StopSharingDocuFileModal } from "./StopSharingDocuFileModal";

export function buildShareURL(sharedToken: string | null): string {
    if (!sharedToken) {
        return '';
    }

    return `${process.env.NEXT_PUBLIC_URL}/shared/documents/${sharedToken}`;
}

export function ShareDocuFileModal({
    docuFile,
    opened,
    onClose
}: {
    docuFile: DocuFilePrimitive,
    opened: boolean,
    onClose: () => void
}) {
    const copyTimeout = 1000;
    const [isGeneratingShareLink, setIsGeneratingShareLink] = useState(false);
    const [hasGeneratedLink, setHasGeneratedLink] = useState(false);
    const [shareURL, setShareURL] = useState(buildShareURL(docuFile.sharedToken));
    const clipboard = useClipboard({ timeout: copyTimeout });
    const [isStopSharingModal, { open: openStopSharingModal, close: closeStopSharingModal }] = useDisclosure(false);

    useEffect(() => {
        async function generateShareLink(docuFileId: string) {
            setHasGeneratedLink(true);
            setIsGeneratingShareLink(true);
            
            await customFetch(API_ROUTES.DOCUMENT_SHARE(docuFileId), {
                method: 'POST',
            });
            const res = await customFetch(API_ROUTES.DOCUMENT(docuFileId));
            const docuFileUpdated: DocuFilePrimitive = await res.json();
            
            setShareURL(buildShareURL(docuFileUpdated.sharedToken));
            setIsGeneratingShareLink(false);
        }
        
        if (!docuFile.sharedToken && opened) {
            generateShareLink(docuFile.id);
        }
    }, [docuFile.id, docuFile.sharedToken, opened]);

    if (isGeneratingShareLink) {
        return (
            <Modal opened={opened} onClose={onClose} title="Link to share" centered overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}>
                    <Text ta='center' c='dimmed'>
                        Generating share link...
                    </Text>
                    
                    <Space h="xl" />
                    
                    <Center>
                        <Loader color="blue" />
                    </Center>

                    <Space h="xl" />
            </Modal>
        );
    }

    return (
        <>
            <Modal opened={opened} onClose={onClose} title="Link to share" centered overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}>
                <Input value={shareURL} readOnly onClick={() => clipboard.copy(shareURL)} pointer />

                <Group mt="xl" justify="space-between">
                    <Button onClick={openStopSharingModal} color="red" variant="outline">Stop sharing</Button>
                    
                    <CopyButton value={shareURL!} timeout={copyTimeout}>
                        {({ copied, copy }) => {
                            const isCopied = (copied || clipboard.copied)
                            return (
                                <Button color={isCopied ? 'teal' : 'blue'} onClick={copy}>
                                    {isCopied ? 'Copied url' : 'Copy url'}
                                </Button>
                            )
                        }}
                    </CopyButton>
                </Group>
            </Modal>
            <StopSharingDocuFileModal opened={isStopSharingModal} docuFile={docuFile} onClose={closeStopSharingModal} />
        </>
    );
}
