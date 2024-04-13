import { DatabaseType } from "../../../../../../../_core/Accounts/Domain/VOs/Database";
import { MigrateModal } from "../MigrateModal/MigrateModal";

export function SQLiteModal({
    email,
    database,
    isOpen,
    onExit,
    onMigrate
}: {
    email: string,
    database: DatabaseType,
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
        />       
    );
}
