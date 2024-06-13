'use client'

import classes from './ListDeletedDocuFiles.module.css';
import { Center, Space, Text } from "@mantine/core";
import { IconFiles } from "@tabler/icons-react";
import { useGetDeletedDocuFiles } from "../../_hooks/useGetDeletedDocuFiles";
import { DeletedDocuFileSkeleton } from '../DeletedDocuFile/DeletedDocuFileSkeleton';
import { DeletedDocuFile } from '../DeletedDocuFile/DeletedDocuFile';

export function ListDeletedDocuFiles() {
    const { deletedDocuFiles, isLoading } = useGetDeletedDocuFiles();

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
            <section>
                <Space h="120px" />
                <Center>
                    <IconFiles size={50} color="#9A9A9A" stroke={1.5}/>
                </Center>
                <Space h="20px" />
                <Center>
                    <Text color="#9A9A9A" fw={600} size="1.5rem">Your bin is empty</Text>
                </Center>
            </section>
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
