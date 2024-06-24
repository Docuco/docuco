'use client'

import Link from 'next/link';
import { FolderAncestorsDTO } from '../../../../../../_core/Folders/Application/DTOs/FolderAncestorsDTO';
import { useGetFolderAncestors } from '../../../_hooks/useGetFolderAncestors';
import classes from './Breadcrumbs.module.css';
import { Button } from '@mantine/core';
import { IconMathGreater } from '@tabler/icons-react';

export function Breadcrumbs({
    folderId,
}: {
    folderId: string | null
}) {
    const { ancestors } = useGetFolderAncestors(folderId);
    
    if (!ancestors) {
        return (
            <div className={classes.breadcrumb_container}>
                <Button
                    variant="transparent"
                    size='compact-lg'
                    className={classes.breadcrumb_button}
                    component={Link}
                    href={`${process.env.NEXT_PUBLIC_URL}/folders`}
                >
                    My Docs
                </Button>
            </div>
        )    
    }

    return (
        <div className={classes.breadcrumb_container}>
            <Button
                variant="transparent"
                size='compact-lg'
                component={Link}
                href={`${process.env.NEXT_PUBLIC_URL}/folders`}
            >
                My Docs
            </Button>
            {ancestors && <IconMathGreater size={16} stroke={1.3} />}
            <Breadcrumb folder={ancestors}/>
        </div>
    );
}

export function Breadcrumb({
    folder,
}: {
    folder: FolderAncestorsDTO
}) {
    if (!folder) {
        return <></>;
    }

    return (
        <div className={classes.breadcrumb_container}>
            <Button
                variant="transparent"
                size='compact-lg'
                component={Link}
                href={`${process.env.NEXT_PUBLIC_URL}/folders/${folder.id}`}
            >
                {folder.name}
            </Button>
            {folder.folderChildren && <IconMathGreater size={16} stroke={1.3} />}
            {folder.folderChildren && <Breadcrumb folder={folder.folderChildren}/>}
        </div>
    );
}