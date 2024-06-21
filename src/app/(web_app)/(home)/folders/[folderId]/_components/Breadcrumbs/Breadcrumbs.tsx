'use client'

import Link from 'next/link';
import { FolderAncestorsDTO } from '../../../../../../_core/Folders/Application/DTOs/FolderAncestorsDTO';
import { useGetFolderAncestors } from '../../../_hooks/useGetFolderAncestors';
import classes from './Breadcrumbs.module.css';

export function Breadcrumbs({
    folderId,
}: {
    folderId: string | null
}) {
    const { ancestors } = useGetFolderAncestors(folderId);
    
    if (!ancestors) {
        return (
            <>
                <Link href={`${process.env.NEXT_PUBLIC_URL}/folders`}>My Docs</Link>
            </>
        )    
    }

    return (
        <>
            <Link href={`${process.env.NEXT_PUBLIC_URL}/folders`}>My Docs</Link>
            {ancestors && <span> / </span>}
            <Breadcrumb folder={ancestors}/>
        </>
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
        <>
            <Link href={`${process.env.NEXT_PUBLIC_URL}/folders/${folder.id}`}>{folder.name}</Link>
            {folder.folderChildren && <span> / </span>}
            {folder.folderChildren && <Breadcrumb folder={folder.folderChildren}/>}
        </>
    );
}