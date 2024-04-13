import { ActionIcon, Card, CardSection, Center, Group, Skeleton, rem } from "@mantine/core";
import classes from './DocuFile.module.css'
import { IconDots, IconFile } from "@tabler/icons-react";

export function DocuFileSkeleton() {

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
            <CardSection inheritPadding py="xs">
                <Group justify="flex-end">
                    <ActionIcon variant="subtle" color="gray">
                        <IconDots style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                </Group>
            </CardSection>

            <Center inline>
                <IconFile size={32} stroke={1.3} />
            </Center>

            <Group justify="space-between" mt="md" mb="xs" className={classes.text}>
                <Skeleton height={17} radius="xl" />
                <Skeleton height={17} radius="xl" />
            </Group>
        </Card>
    );
}
