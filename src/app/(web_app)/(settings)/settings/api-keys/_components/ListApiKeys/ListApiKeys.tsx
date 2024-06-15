'use client'

import { ApiKey } from "../ApiKey/ApiKey";
import classes from './ListApiKeys.module.css';
import { ApiKeySkeleton } from "../ApiKey/ApiKeySkeleton";
import { Center, Space, Text } from "@mantine/core";
import { IconKey } from "@tabler/icons-react";
import { useGetApiKeys } from "../../_hooks/useGetApiKeys";

export function ListApiKeys() {
    const { apiKeys, isLoading } = useGetApiKeys();

    if (isLoading) {
        return (
            <div className={classes.viewContainer}>
                <section className={classes.listContainer}>
                    {[...new Array(5).keys()].map((index) => (
                        <ApiKeySkeleton key={index} />
                    ))}
                </section>
            </div>
        )
    }

    if (apiKeys.length === 0) {
        return (
            <div className={classes.viewContainer}>
                <section>
                    <Space h="120px" />
                    <Center>
                        <IconKey size={50} color="#9A9A9A" stroke={1.5}/>
                    </Center>
                    <Space h="20px" />
                    <Center>
                        <Text c="#9A9A9A" fw={600} size="1.5rem">No api keys found</Text>
                    </Center>
                </section>
            </div>
        )
    }
    
    return (
        <div className={classes.viewContainer}>
            <section className={classes.listContainer}>
                {apiKeys.map((apiKey) => (
                    <ApiKey
                        key={apiKey.apiKeyValue}
                        apiKey={apiKey}
                    />
                ))}
            </section>           
        </div>
    );
}
