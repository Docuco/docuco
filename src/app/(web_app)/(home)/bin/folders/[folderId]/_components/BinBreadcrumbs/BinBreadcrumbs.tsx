'use client'

import Link from 'next/link';
import classes from './BinBreadcrumbs.module.css';
import { Button } from '@mantine/core';
import { IconMathGreater } from '@tabler/icons-react';
import { useGetFolderAncestors } from '../../../../../folders/_hooks/useGetFolderAncestors';
import { FolderAncestorsDTO } from '../../../../../../../_core/Folders/Application/DTOs/FolderAncestorsDTO';

export function BinBreadcrumbs({
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
                    href={`${process.env.NEXT_PUBLIC_URL}/bin`}
                >
                    Bin
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
                href={`${process.env.NEXT_PUBLIC_URL}/bin`}
            >
                Bin
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
                maw={250}
                href={`${process.env.NEXT_PUBLIC_URL}/bin/folders/${folder.id}`}
            >
                <span style={{
                    width: '100%',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    padding: '5px 0',
                }}>
                    {folder.name}
                </span>
            </Button>
            {folder.folderChildren && <IconMathGreater size={16} stroke={1.3} />}
            {folder.folderChildren && <Breadcrumb folder={folder.folderChildren}/>}
        </div>
    );
}