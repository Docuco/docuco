import { Card, CardSection, Group, Skeleton, rem } from "@mantine/core";
import classes from './DeletedFolder.module.css'
import { IconDots, IconFolder } from "@tabler/icons-react";

export function DeletedFolderSkeleton() {

    return (
        <Card
            shadow="sm"
            radius="md"
            withBorder
            p={'xs'}
            className={classes.card}
        >
            <CardSection inheritPadding py="lg" px='md'>
                <Group justify="space-between" gap={0} wrap="nowrap">
                    <Group gap={10} wrap="nowrap">
                        <IconFolder size={16} stroke={1.3} />
                        <Skeleton height={20} width={150} radius="xl" />
                    </Group>
                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                </Group>
            </CardSection>
        </Card>
    );
}
