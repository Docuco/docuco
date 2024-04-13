import { Button, Modal, Space, Text } from "@mantine/core";
import classes from "./MigrateModal.module.css";
import { ReactNode, useState } from "react";
import { API_ROUTES } from "../../../../../../_utils/constants";
import { DatabaseType } from "../../../../../../../_core/Accounts/Domain/VOs/Database";
import { mutate } from "swr";

export function MigrateModal({
    email,
    database,
    title,
    isOpen,
    children,
    onExit,
    onMigrate
}: {
    email: string;
    database: DatabaseType;
    title: string;
    isOpen: boolean;
    children?: ReactNode;
    onExit: () => void;
    onMigrate: () => void;
}) {
    const [isCallingMigration, setIsCallingMigration] = useState(false)

    function onLocalMigrate() {
        setIsCallingMigration(true);

        fetch(`${API_ROUTES.ACCOUNT_SETTINGS(email)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                settings: {
                    database
                }
            })
        })
        mutate(API_ROUTES.ACCOUNT(email));

        setIsCallingMigration(false);
        onMigrate();
    }

    return (
        <>
            <Modal opened={isOpen} onClose={onExit} title={title} centered>
                <Text>
                    Be carful, this action will migrate all your data to the new database.
                    <br /><br />
                    This proccess can take a while depending on the amount of data you have, but you can continue using Docuco while the migration is in progress.
                    <br /><br />
                    We will send you an email when the migration is done.
                </Text>

                <Space h='xl' />

                {
                    children && <>
                        {children}
                        <Space h='xl' />
                    </>
                }

                <div className={classes.modalFooter}>
                    <Button variant="outline" onClick={onExit}>
                        Keep my data where it is
                    </Button>
                    <Button variant="filled" color="red" onClick={onLocalMigrate} loading={isCallingMigration}>
                        Migrate my data
                    </Button>
                </div> 
            </Modal>
        </>
    );
}
