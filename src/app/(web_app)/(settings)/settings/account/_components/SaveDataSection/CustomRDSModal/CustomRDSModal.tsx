import { Button, Modal, Space, Text, TextInput } from "@mantine/core";
import classes from "./CustomRDSModal.module.css";
import { MigrateModal } from "../MigrateModal/MigrateModal";
import { DatabaseType } from "../../../../../../../_core/Accounts/Domain/VOs/Database";

export function CustomRDSModal({
    email,
    database,
    isOpen,
    onExit,
    onMigrate
}: {
    email: string;
    database: DatabaseType;
    isOpen: boolean;
    onExit: () => void;
    onMigrate: () => void;
}) {

    return (
        <MigrateModal
            email={email}
            database={database}
            title="Custom Relational Database"
            isOpen={isOpen}
            onExit={onExit}
            onMigrate={onMigrate}
        >
            <TextInput
                label="Connection string"
                description="Connection string to your custom relational database"
                placeholder="postgres://user:password@host:port/database"
            />
        </MigrateModal> 
    );
}
