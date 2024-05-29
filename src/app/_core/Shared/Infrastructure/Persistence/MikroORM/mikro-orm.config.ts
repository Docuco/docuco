import dotenv from 'dotenv';
import { Options } from "@mikro-orm/core"
import { TsMorphMetadataProvider } from "@mikro-orm/reflection"
import { PostgreSqlDriver } from "@mikro-orm/postgresql"
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';
import { DocuFileSchema } from "../../../../Documents/Infrastructure/Repositories/MikroORM/schemas/DocuFileSchema";
import { AccountSchema } from "../../../../Accounts/Infrastructure/Repositories/MikroORM/schemas/AccountSchema";
import { Migration20240524205610_InitSchema } from '../../../../../../database/migrations/Migration20240524205610_InitSchema';
import { Migration20240527181929_AddSharedToken } from '../../../../../../database/migrations/Migration20240527181929_AddSharedToken';

dotenv.config({
    path: process.env.NODE_ENV === 'development' ? '.env.local' : '',
});

const globalMikroORMConfig: Options = {
    metadataProvider: TsMorphMetadataProvider,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    dbName: process.env.DB_NAME,
    driver: PostgreSqlDriver,
    forceUtcTimezone: true,
    extensions: [SeedManager, Migrator],
    entities: [
        DocuFileSchema,
        AccountSchema,
    ],
    migrations: {
        pathTs: './src/database/migrations',
        migrationsList: [
            {
                name: 'InitSchema',
                class: Migration20240524205610_InitSchema
            },
            {
                name: 'AddSharedToken',
                class: Migration20240527181929_AddSharedToken
            }
        ],
    },
    seeder: {
        pathTs: './src/database/seeds',
        defaultSeeder: 'CreateMasterAccountSeeder',
    }
}

export default globalMikroORMConfig;