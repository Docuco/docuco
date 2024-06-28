'use client'

import classes from './ListFolders.module.css';
import { FolderSkeleton } from "../Folder/FolderSkeleton";
import { useGetFolders } from "../../_hooks/useGetFolders";
import { FolderPrimitive } from "../../../../../_core/Folders/Domain/Primitives/FolderPrimitive";
import { Folder } from "../Folder/Folder";
import { useRouter } from 'next/navigation';
import { Title } from '@mantine/core';

export function ListFolders({
    folderParentId
}: {
    folderParentId: string | null
}) {
    const { folders, isLoading } = useGetFolders(folderParentId);

    async function goToFolder(folder: FolderPrimitive) {
        
    }

    if (isLoading) {
        return (
            <div className={classes.viewContainer}>
                <Title order={3} size={14} my={5}>Folders</Title>
                <section className={classes.listContainer}>
                    {[...new Array(4).keys()].map((index) => (
                        <FolderSkeleton key={index} />
                    ))}
                </section>
            </div>
        )
    }

    if (folders.length === 0) {
        return (
            <>
            </>
        )
    }
    
    return (
        <div className={classes.viewContainer}>
            <Title order={3} size={14} my={5}>Folders</Title>
            <section className={classes.listContainer}>
                {folders.map((folder) => (
                    <Folder
                        key={folder.id}
                        folder={folder}
                        folderParentId={folderParentId}
                        onClick={goToFolder}
                    />
                ))}
            </section>
        </div>
    );
}
