'use client'

import { useGetDeletedFolders } from '../../_hooks/useGetDeletedFolders';
import { DeletedFolder } from '../DeletedFolder/DeletedFolder';
import { DeletedFolderSkeleton } from '../DeletedFolder/DeletedFolderSkeleton';
import classes from './ListDeletedFolders.module.css';

export function ListDeletedFolders({
    folderParentId
}: {
    folderParentId: string | null
}) {
    const { deletedFolders, isLoading } = useGetDeletedFolders(folderParentId);

    if (isLoading) {
        return (
            <section className={classes.listContainer}>
                {[...new Array(10).keys()].map((index) => (
                    <DeletedFolderSkeleton key={index} />
                ))}
            </section>
        )
    }

    if (deletedFolders.length === 0) {
        return (
            <>
            </>
        )
    }
    
    return (
        <section className={classes.listContainer}>
            {deletedFolders.map((folder) => (
                <DeletedFolder key={folder.id} folder={folder} />
            ))}
        </section>
    );
}
