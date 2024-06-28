import { Button, Space } from "@mantine/core";
import Link from "next/link";
import { Fragment } from "react";
import { IconFiles, IconHome, IconTrash } from "@tabler/icons-react";

const navLinks = (path: string) => [
    {
        label: 'Home',
        icon: <IconHome stroke={1.3}/>,
        href: '/home',
        variant: path === '/home' ? 'filled' : 'subtle',
    },
    {
        label: 'My Docs',
        icon: <IconFiles stroke={1.3} />,
        href: '/folders',
        variant: path === '/folders' ? 'filled' : 'subtle',
    },
    {
        label: 'Bin',
        icon: <IconTrash stroke={1.3} />,
        href: '/bin',
        variant: path === '/bin' ? 'filled' : 'subtle',
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