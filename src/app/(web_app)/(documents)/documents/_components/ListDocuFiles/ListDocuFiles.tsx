'use client'

import { useGetDocuFiles } from "../../_hooks/useGetDocuFiles";
import { DocuFile } from "../DocuFile/DocuFile";
import classes from './ListDocuFiles.module.css';
import { DocuFileSkeleton } from "../DocuFile/DocuFileSkeleton";
import { Center, Space, Text } from "@mantine/core";
import { IconFiles } from "@tabler/icons-react";

export function ListDocuFiles() {
    const { docuFiles, isLoading } = useGetDocuFiles();

    if (isLoading) {
        return (
            <section className={classes.listContainer}>
                {[...new Array(10).keys()].map((index) => (
                    <DocuFileSkeleton key={index} />
                ))}
            </section>
        )
    }

    if (docuFiles.length === 0) {
        return (
            <section>
                <Space h="120px" />
                <Center>
                    <IconFiles size={50} color="#9A9A9A" stroke={1.5}/>
                </Center>
                <Space h="20px" />
                <Center>
                    <Text color="#9A9A9A" fw={600} size="1.5rem">No documents found</Text>
                </Center>
            </section>
        )
    }
    
    return (
        <section className={classes.listContainer}>
            {docuFiles.map((docuFile) => (
                <DocuFile key={docuFile.id} docuFile={docuFile} />
            ))}
        </section>
    );
}
