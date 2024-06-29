'use client'

import classes from './ListDeletedDocuFiles.module.css';
import { useGetDeletedDocuFiles } from "../../_hooks/useGetDeletedDocuFiles";
import { DeletedDocuFileSkeleton } from '../DeletedDocuFile/DeletedDocuFileSkeleton';
import { DeletedDocuFile } from '../DeletedDocuFile/DeletedDocuFile';

export function ListDeletedDocuFiles({
    parentFolderId
}: {
    parentFolderId: string | null;
}) {
    const { deletedDocuFiles, isLoading } = useGetDeletedDocuFiles(parentFolderId);

    if (isLoading) {
        return (
            <section className={classes.listContainer}>
                {[...new Array(10).keys()].map((index) => (
                    <DeletedDocuFileSkeleton key={index} />
                ))}
            </section>
        )
    }

    if (deletedDocuFiles.length === 0) {
        return (
            <>
            </>
        )
    }
    
    return (
        <section className={classes.listContainer}>
            {deletedDocuFiles.map((docuFile) => (
                <DeletedDocuFile key={docuFile.id} docuFile={docuFile} />
            ))}
        </section>
    );
}
