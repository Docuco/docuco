import { ActionIcon, Card, CardSection, Group, Skeleton, Space, rem } from "@mantine/core";
import classes from './User.module.css'
import { IconCopy, IconDots } from "@tabler/icons-react";

export function UserSkeleton() {

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
            
            <Space h="sm" />

            <CardSection px='xs' pb='xs' inheritPadding py="xs">
                <Group justify="flex-end">
                    <Skeleton height={10} width={100} />
                </Group>
            </CardSection>
        </Card>
    );
}
