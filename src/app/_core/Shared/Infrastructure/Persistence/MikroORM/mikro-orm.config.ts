import { Options } from "@mikro-orm/core"
import { TsMorphMetadataProvider } from "@mikro-orm/reflection"
import { BetterSqliteDriver } from "@mikro-orm/better-sqlite"
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';
import { DocuFileSchema } from "../../../../Documents/Infrastructure/Repositories/MikroORM/schemas/DocuFileSchema";
import { Migration20240408133636_CreateDocuFileTable } from "../../../../../../database/migrations/Migration20240408133636_CreateDocuFileTable";
import { AccountSchema } from "../../../../Accounts/Infrastructure/Repositories/MikroORM/schemas/AccountSchema";
import { SettingsSchema } from "../../../../Accounts/Infrastructure/Repositories/MikroORM/schemas/SettingsSchema";
import { Migration20240408185924_CreateAccountTable } from "../../../../../../database/migrations/Migration20240408185924_CreateAccountTable";

import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === 'development' ? '.env.local' : '',
});

const globalMikroORMConfig: Options = {
    metadataProvider: TsMorphMetadataProvider,
    dbName: 'docuco-db',
    driver: BetterSqliteDriver,
    forceUtcTimezone: true,
    extensions: [SeedManager, Migrator],
    entities: [
        DocuFileSchema,
        SettingsSchema,
        AccountSchema,
    ],
    migrations: {
        pathTs: './src/database/migrations',
        migrationsList: [
            {
                name: 'CreateDocuFileTable',
                class: Migration20240408133636_CreateDocuFileTable
            },
            {
                name: 'CreateAccountTable',
                class: Migration20240408185924_CreateAccountTable
            },
        ],
    },
    seeder: {
        pathTs: './src/database/seeds',
        defaultSeeder: 'CreateMasterAccountSeeder',
    }
}

export default globalMikroORMConfig;