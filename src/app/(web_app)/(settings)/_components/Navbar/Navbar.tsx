import { Button, Space } from "@mantine/core";
import Link from "next/link";
import { Fragment } from "react";
import { IconArrowLeft, IconBox, IconKey, IconUserCircle, IconUsers } from "@tabler/icons-react";

const navLinks = (path: string) => [
    {
        label: 'Home',
        icon: <IconArrowLeft stroke={1.3}/>,
        href: '/home',
        variant: path === '/home' ? 'filled' : 'subtle',
    },
    {
        label: 'Account',
        icon: <IconUserCircle stroke={1.3} />,
        href: '/settings/account',
        variant: path === '/settings/account' ? 'filled' : 'subtle',
    },
    {
        label: 'Users',
        icon: <IconUsers stroke={1.3} />,
        href: '/settings/users',
        variant: path === '/settings/users' ? 'filled' : 'subtle',
    },
    {
        label: 'Api keys',
        icon: <IconKey stroke={1.3} />,
        href: '/settings/api-keys',
        variant: path === '/settings/api-keys' ? 'filled' : 'subtle',
    },
];

export function Navbar({
    path,
    onNavigate,
}: {
    path: string,
    onNavigate: () => void,
}) {

    return (
        <>
            {navLinks(path).map((link, index) => {
                return (
                    <Fragment key={link.href}>
                        <Button
                            component={Link}
                            variant={link.variant}
                            href={link.href}
                            onClick={onNavigate}
                            leftSection={link.icon}
                        >
                            {link.label}
                        </Button>
                        {index < navLinks(path).length - 1 && <Space h='md' />}
                    </Fragment>
                );
            })}
            
            <Space h='xl' />
            <Space h='xl' />
        </>
    );
}