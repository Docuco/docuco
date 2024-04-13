import {
    Title,
    Space,
    Card,
    Text,
} from '@mantine/core';
import classes from './SaveDataSection.module.css';
import { useState } from 'react';
import { CustomRDSModal } from './CustomRDSModal/CustomRDSModal';
import { useDisclosure } from '@mantine/hooks';
import { SQLiteModal } from './SQLiteModal/SQLiteModal';
import { SettingsPrimitive } from '../../../../../../_core/Accounts/Domain/Primitives/SettingsPrimitive';
import { AccountPrimitive } from '../../../../../../_core/Accounts/Domain/Primitives/AccountPrimitive';

export function SaveDataSection({
    account,
}: {
    account: AccountPrimitive
}) {
    const chosenDatabase = account.settings.database;
    const [selectedDatabase, setSelectedDatabase] = useState(chosenDatabase);
    const [isOpenedRDBModal, { open: openRDBModal, close: closeRDBModal }] = useDisclosure(false);
    const [isOpenedSQLiteModal, { open: openSQLiteModal, close: closeSQLiteModal }] = useDisclosure(false);

    return (
        <>
            <Title order={2} c='blue'>Select where you prefer to save your data</Title>
            <Text c="dimmed">
                This database options is where the information about your DocuFiles are saved. The information related with the account will continue stay in SQLite in order to keep access to the account even if the custom database is not available.
            </Text>
            <Space h='xl' />

            <div className={classes.optionsContainer}>
                <SQLite
                    isSelected={selectedDatabase === 'SQLite'}
                    onClick={() => {
                        if (selectedDatabase !== 'SQLite') {
                            setSelectedDatabase('SQLite')
                            openSQLiteModal()
                        }
                    }}
                />
                <CustomRDB
                    isSelected={selectedDatabase === 'CustomRDB'}
                    onClick={() => {
                        if (selectedDatabase !== 'CustomRDB') {
                            setSelectedDatabase('CustomRDB')
                            openRDBModal()
                        }
                    }}
                />
            </div>

            <SQLiteModal
                email={account.email}
                database='SQLite'
                isOpen={isOpenedSQLiteModal}
                onExit={() => {
                    closeSQLiteModal()
                    setSelectedDatabase(chosenDatabase)
                }}
                onMigrate={() => {
                    closeSQLiteModal()
                    setSelectedDatabase('SQLite')
                }}
            />

            <CustomRDSModal
                email={account.email}
                database='CustomRDB'
                isOpen={isOpenedRDBModal}
                onExit={() => {
                    closeRDBModal()
                    setSelectedDatabase(chosenDatabase)
                }}
                onMigrate={() => {
                    closeRDBModal()
                    setSelectedDatabase('CustomRDB')
                }}
            />
        </>
    );
}

function SQLite({
    isSelected,
    onClick
}: {
    isSelected: boolean;
    onClick: () => void;
}) {
    return (
        <Card withBorder className={`${classes.card} ${isSelected ? classes.optionSelected : ''}`} onClick={onClick}>
            <Text fw={500}>SQLite</Text>
            <Text c="dimmed">
                If you choose this option the data will be saved with SQLite in the server that is running Docuco. It&apos;s the easiest way to start using Docuco. You can always migrate the data to a custom database later
            </Text>
        </Card>
    );
}

function CustomRDB({
    isSelected,
    onClick
}: {
    isSelected: boolean;
    onClick: () => void;
}) {
    return (
        <Card withBorder className={`${classes.card} ${isSelected ? classes.optionSelected : ''}`} onClick={onClick}>
            <Text fw={500}>Custom Relational Database</Text>
            <Text c="dimmed">
                If you choose this option the data will be saved in any relational database you want, you just need to provide the connection string. It could be MySQL, PostgreSQL, etc. from any cloud provider or self-hosted database
            </Text>
        </Card>
    );
}