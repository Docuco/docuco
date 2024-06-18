import { ActionIcon, Button, Card, CardSection, Center, CopyButton, Group, Menu, MenuDropdown, MenuItem, MenuTarget, Space, Text, TextInput, Title, Tooltip, rem } from "@mantine/core";
import classes from './ApiKey.module.css'
import { IconCopy, IconDots, IconRefresh, IconShare, IconTransform, IconTrash } from "@tabler/icons-react";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { DeleteApiKeyModal } from "./DeleteApiKeyModal";
import { ApiKeyPrimitive } from "../../../../../../_core/Auth/Domain/Primitives/ApiKeyPrimitive";
import { UpdateApiKeyForm } from "../ApiKeyForm/UpdateApiKeyForm";
import { relativeTimeFormat } from "../../../../../_utils/relativeTimeFormat";
import { RegenerateApiKeyModal } from "./RegenerateApiKeyModal";
import { useTokenPayload } from "../../../../../_utils/_hooks/useTokenPayload";

export function ApiKey({
    apiKey,
}: {
    apiKey: ApiKeyPrimitive
}) {
    const [isOpenedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [isOpenedUpdateModal, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
    const [isOpenedRegenerateModal, { open: openRegenerateModal, close: closeRegenerateModal }] = useDisclosure(false);
    const clipboard = useClipboard({ timeout: 1000 });
    const tokenPayload = useTokenPayload()
    
    const canDelete = tokenPayload.permissions.includes('api_key:delete')
    const canUpdateData = tokenPayload.permissions.includes('api_key:update')
    const canChangePermissions = tokenPayload.permissions.includes('api_key:change_permissions')
    const canRegenerate = tokenPayload.permissions.includes('api_key:regenerate')
    const canUpdate = canUpdateData || canChangePermissions
    

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
                    <Group justify="space-between" align="center">
                        <Text fw={600}>{apiKey.name}</Text>
                        {(canUpdate || canRegenerate || canDelete) && <Menu withinPortal position="bottom-end" shadow="sm">
                            <MenuTarget>
                                <ActionIcon variant="subtle" color="gray" onClick={(e) => e.stopPropagation()}>
                                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                            </MenuTarget>

                            <MenuDropdown>
                                {canUpdate && <MenuItem
                                    leftSection={<IconTransform color='teal' style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        openUpdateModal()
                                    }}
                                >
                                    Update
                                </MenuItem>}
                                {canRegenerate && <MenuItem
                                    leftSection={<IconRefresh color="orange"  style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        openRegenerateModal()
                                    }}
                                >
                                    Regenerate
                                </MenuItem>}
                                {canDelete && <MenuItem
                                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                    color="red"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        openDeleteModal()
                                    }}
                                >
                                    Delete
                                </MenuItem>}
                            </MenuDropdown>
                        </Menu>}
                    </Group>
                </CardSection>
                
                <Space h="sm" />

                <Group justify="flex-start" gap={1}>
                    <Title size="sm" c="dimmed">API Key:</Title>
                    <Tooltip label={clipboard.copied ? 'Copied' : 'Copy Api Key'}>
                        <ActionIcon variant="subtle" color={clipboard.copied ? 'teal' : 'gray'} onClick={(e) => {
                            e.stopPropagation()
                            clipboard.copy(apiKey.apiKeyValue)
                        }}>
                            <IconCopy style={{ width: rem(16), height: rem(16) }} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
                <Space h='xs' />
                <Text size="md" fw={500}>
                    {apiKey.apiKeyValue}
                </Text>

                <Group justify="space-between" mt="md" mb="xs" className={classes.text}>
                    <Text size='sm' lineClamp={2} c='dimmed'>{apiKey.description}</Text>
                </Group>

                <Card.Section px='xs' pb='xs'>
                    <Group justify='flex-end'>
                        <Text size='xs' c='dimmed'>created {relativeTimeFormat(apiKey.createdAt)}</Text>
                    </Group>
                </Card.Section>
            </Card>

            <DeleteApiKeyModal apiKey={apiKey} onClose={closeDeleteModal} isOpened={isOpenedDeleteModal} />
            <UpdateApiKeyForm apiKey={apiKey} onClose={closeUpdateModal} isOpened={isOpenedUpdateModal} />
            <RegenerateApiKeyModal apiKey={apiKey} onClose={closeRegenerateModal} isOpened={isOpenedRegenerateModal} />
        </>
    );
}
