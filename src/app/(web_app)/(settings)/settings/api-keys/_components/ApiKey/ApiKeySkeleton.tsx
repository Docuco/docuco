import { ActionIcon, Card, CardSection, Group, Skeleton, Space, rem } from "@mantine/core";
import classes from './ApiKey.module.css'
import { IconCopy, IconDots } from "@tabler/icons-react";

export function ApiKeySkeleton() {

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={classes.card}
        >
            <CardSection inheritPadding py="xs">
                <Group justify="space-between" align='center'>
                    <Skeleton height={15} width={'150px'} />
                    <ActionIcon variant="subtle" color="gray">
                        <IconDots style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                </Group>
            </CardSection>
            
            <Space h="lg" />

            <Group justify="flex-start" gap={1}>
                <Skeleton height={15} width={90} radius="xl" />
                <IconCopy style={{ width: rem(16), height: rem(16) }} />
            </Group>
            
            <Space h='md' />

            <Skeleton height={18} width={'90%'} radius="xl" />

            <Group mt="md" mb="xs" className={classes.text} display='block'>
                <Space h='md' />
                <Skeleton height={10} radius="xl" />
                <Space h='md' />
                <Skeleton height={10} width={'40%'} radius="xl" />
            </Group>

            <CardSection px='xs' pb='xs' inheritPadding py="xs">
                <Group justify="flex-end">
                    <Skeleton height={10} width={100} />
                </Group>
            </CardSection>
        </Card>
    );
}
