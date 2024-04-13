import {
    Group,
    Burger,
    Avatar,
    Popover,
    PopoverTarget,
    UnstyledButton,
    NavLink,
} from '@mantine/core';
import {
    IconSettings,
} from '@tabler/icons-react';
import classes from './Header.module.css';
import { Logo } from '../Logo';

export function Header({
    opened,
    onClickBurger
}: {
    opened: boolean,
    onClickBurger: () => void
}) {
    return (
        <>
            <header className={classes.header}>

                <Group visibleFrom='sm'></Group>

                <Group h="100%" gap={0}>
                    <Popover width={200} position="bottom" withArrow shadow="md">
                        <PopoverTarget>
                            <UnstyledButton>
                                <Avatar alt="it's me" />
                            </UnstyledButton>
                        </PopoverTarget>
                        <Popover.Dropdown>
                            <NavLink
                                href="/settings"
                                label="Settings"
                                leftSection={<IconSettings size="1rem" stroke={1.5} />}
                            />
                        </Popover.Dropdown>
                    </Popover>
                </Group>

                <Burger
                    opened={opened}
                    onClick={onClickBurger}
                    hiddenFrom="sm"
                    size="sm"
                />
            </header>
        </>
    );
}