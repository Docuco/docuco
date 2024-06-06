'use client'

import {
    Box,
    Button,
    Group,
    Modal,
    Text,
    rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFiles, IconUpload, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Dropzone, DropzoneAccept, DropzoneIdle, DropzoneReject, FileRejection, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import classes from './AddNewDocumentButton.module.css';
import { mutate } from 'swr';
import { API_ROUTES } from '../../../../_utils/constants';
import { clientCustomFetch } from '../../../../_utils/fetch';

export function AddNewDocumentButton() {
    const [isOpened, { open, close }] = useDisclosure(false);
    const [fileErrors, setFileErrors] = useState<FileRejection[]>([]);
    const [isUploadingFiles, setIsUploadingFiles] = useState(false);

    const fileSizeInMB = 20 * 1024 ** 2; // 20MiB TODO: could be configurable by env var

    useEffect(() => {
        resetStates();
    }, [isOpened]);

    function resetStates() {
        setFileErrors([]);
        setIsUploadingFiles(false);
    }

    async function uploadFiles(documents: FileWithPath[]) {
        setIsUploadingFiles(true);

        const data = new FormData();
        for (const document of documents) {
            data.append(`documents[]`, document, document.name);
        }

        await clientCustomFetch(`${API_ROUTES.DOCUMENTS}`, {
            method: 'POST',
            body: data,
        })
        await mutate(API_ROUTES.DOCUMENTS);

        setIsUploadingFiles(false);
        close();
    }

    return (
        <>
            <Button variant="outline" onClick={open}>
                Add new document
            </Button>

            <Modal opened={isOpened} onClose={close} title="Add new document" centered overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}>
                <Dropzone
                    onDrop={uploadFiles}
                    onReject={setFileErrors}
                    maxSize={fileSizeInMB}
                    loading={isUploadingFiles}
                    accept={[
                        MIME_TYPES.csv,
                        MIME_TYPES.pdf,
                        MIME_TYPES.doc,
                        MIME_TYPES.docx,
                        MIME_TYPES.xls,
                        MIME_TYPES.xlsx,
                    ]}
                >
                    <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                        <DropzoneAccept>
                            <IconUpload
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                stroke={1.5}
                            />
                        </DropzoneAccept>
                        <DropzoneReject>
                            <IconX
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                stroke={1.5}
                            />
                        </DropzoneReject>
                        <DropzoneIdle>
                            <IconFiles
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                stroke={1.5}
                            />
                        </DropzoneIdle>

                        <div>
                            <Text size="xl" inline>
                                Drag documents here or click to select files
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                Attach as many files as you like, each file should not exceed {fileSizeInMB / 1024 ** 2}MiB and should be in one of the following formats: .csv, .pdf, .doc, .docx, .xls, .xlsx
                            </Text>
                        </div>
                    </Group>
                </Dropzone>

                <Box>
                    {fileErrors.length > 0 && (
                        <Box mt={15}>
                            {fileErrors.map((error, index) => {
                                return (
                                    <>
                                        <Text key={index} c="red" size="sm">
                                            {error.file.name} - File is not valid
                                        </Text>
                                    </>
                                )
                            })}
                        </Box>
                    )}
                </Box>
            </Modal>
        </>
    );
}