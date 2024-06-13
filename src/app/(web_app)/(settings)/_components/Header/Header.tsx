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
    IconLogout,
    IconSettings,
} from '@tabler/icons-react';
import classes from './Header.module.css';
import { Logo } from '../Logo';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export function Header({
    opened,
    onClickBurger
}: {
    opened: boolean,
    onClickBurger: () => void
}) {
    const router = useRouter()

    function logout() {
        deleteCookie('token');
        router.push('/login');
    }

    return (
        <>
            <header className={classes.header}>
                <Logo />

                <Group h="100%" gap={0} visibleFrom="sm">
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
                            <NavLink
                                component='button'
                                label="Log out"
                                c='red'
                                onClick={logout}
                                leftSection={<IconLogout size="1rem" stroke={1.5} />}
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