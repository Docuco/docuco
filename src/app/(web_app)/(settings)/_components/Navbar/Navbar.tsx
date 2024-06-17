import { Button, Space } from "@mantine/core";
import Link from "next/link";
import { Fragment } from "react";
import { IconArrowLeft, IconKey, IconUserCircle, IconUsers } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { Token } from "../../../../_core/Auth/Domain/VOs/Token";
import { UserTokenPayload } from "../../../../_core/Auth/Domain/VOs/UserToken";
import { PermissionType } from "../../../../_core/Shared/Domain/VOs/Permission";
import { useTokenPayload } from "../../../_utils/_hooks/useTokenPayload";

const navLinks = (path: string): {
    label: string,
    icon: JSX.Element,
    href: string,
    variant: 'filled' | 'subtle',
    permissions: PermissionType[],
}[] => [
    {
        label: 'Home',
        icon: <IconArrowLeft stroke={1.3}/>,
        href: '/home',
        variant: path === '/home' ? 'filled' : 'subtle',
        permissions: [],
    },
    {
        label: 'Account',
        icon: <IconUserCircle stroke={1.3} />,
        href: '/settings/account',
        variant: path === '/settings/account' ? 'filled' : 'subtle',
        permissions: [],
    },
    {
        label: 'Users',
        icon: <IconUsers stroke={1.3} />,
        href: '/settings/users',
        variant: path === '/settings/users' ? 'filled' : 'subtle',
        permissions: ['users:read'],
    },
    {
        label: 'Api keys',
        icon: <IconKey stroke={1.3} />,
        href: '/settings/api-keys',
        variant: path === '/settings/api-keys' ? 'filled' : 'subtle',
        permissions: ['api_key:read'],
    },
];

export function Navbar({
    path,
    onNavigate,
}: {
    path: string,
    onNavigate: () => void,
}) {
    const tokenPayload = useTokenPayload();

    const navLinksToShow = navLinks(path).filter(link => {
        if (link.permissions.length === 0) {
            return true;
        }

        return link.permissions.every(permission => tokenPayload.permissions.includes(permission));
    });

    return (
        <>
            {navLinksToShow.map((link, index) => {
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