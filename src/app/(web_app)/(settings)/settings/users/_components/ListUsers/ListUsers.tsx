'use client'

import classes from './ListUsers.module.css';
import { Center, Space, Text } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { useGetUsers } from '../../_hooks/useGetUsers';
import { UserSkeleton } from '../User/UserSkeleton';
import { User } from '../User/User';

export function ListUsers() {
    const { users, isLoading } = useGetUsers();

    if (isLoading) {
        return (
            <div className={classes.viewContainer}>
                <section className={classes.listContainer}>
                    {[...new Array(5).keys()].map((index) => (
                        <UserSkeleton key={index} />
                    ))}
                </section>
            </div>
        )
    }

    if (users.length === 0) {
        return (
            <div className={classes.viewContainer}>
                <section>
                    <Space h="120px" />
                    <Center>
                        <IconUsers size={50} color="#9A9A9A" stroke={1.5}/>
                    </Center>
                    <Space h="20px" />
                    <Center>
                        <Text c="#9A9A9A" fw={600} size="1.5rem">No users found</Text>
                    </Center>
                </section>
            </div>
        )
    }
    
    return (
        <div className={classes.viewContainer}>
            <section className={classes.listContainer}>
                {[...users].sort((u1, u2) => u1.createdAt - u2.createdAt).map((user) => (
                    <User
                        key={user.id}
                        user={user}
                    />
                ))}
            </section>           
        </div>
    );
}
