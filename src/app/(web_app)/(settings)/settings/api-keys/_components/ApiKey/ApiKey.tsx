import { ActionIcon, Card, CardSection, Center, Group, Menu, MenuDropdown, MenuItem, MenuTarget, Text, rem } from "@mantine/core";
import classes from './ApiKey.module.css'
import { IconDots, IconRefresh, IconShare, IconTrash } from "@tabler/icons-react";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { DeleteApiKeyModal } from "./DeleteApiKeyModal";
import { ApiKeyPrimitive } from "../../../../../../_core/Auth/Domain/Primitives/ApiKeyPrimitive";
import { CreateApiKeyForm } from "../ApiKeyForm/CreateApiKeyForm";
import { CreateApiKeyDTO } from "../../../../../../_core/Auth/Application/DTOs/CreateApiKeyDTO";
import { API_ROUTES } from "../../../../../_utils/constants";
import { clientCustomFetch } from "../../../../../_utils/fetch";
import { mutate } from "swr";
import { UpdateApiKeyForm } from "../ApiKeyForm/UpdateApiKeyForm";

export function ApiKey({
    apiKey,
}: {
    apiKey: ApiKeyPrimitive
}) {
    const [isOpenedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [isOpenedUpdateModal, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
    // const clipboard = useClipboard({ timeout: 1000 });

    return (
        <>
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={classes.card}
                onClick={openUpdateModal}
            >
                <CardSection inheritPadding py="xs">
                    <Group justify="flex-end">
                        <Menu withinPortal position="bottom-end" shadow="sm">
                            <MenuTarget>
                                <ActionIcon variant="subtle" color="gray" onClick={(e) => e.stopPropagation()}>
                                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                            </MenuTarget>

                            <MenuDropdown>
                                <MenuItem
                                    leftSection={<IconRefresh style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => {}}
                                >
                                    Regenerate
                                </MenuItem>
                                <MenuItem
                                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                    color="red"
                                    onClick={openDeleteModal}
                                >
                                    Delete
                                </MenuItem>
                            </MenuDropdown>
                        </Menu>
                    </Group>
                </CardSection>

                <Center inline>
                    {apiKey.name}
                </Center>

                <Group justify="space-between" mt="md" mb="xs" className={classes.text}>
                    <Text lineClamp={2}>{apiKey.description}</Text>
                </Group>
            </Card>

            <DeleteApiKeyModal apiKey={apiKey} onClose={closeDeleteModal} opened={isOpenedDeleteModal} />
            <UpdateApiKeyForm apiKey={apiKey} onClose={closeUpdateModal} isOpened={isOpenedUpdateModal} />
        </>
    );
}
