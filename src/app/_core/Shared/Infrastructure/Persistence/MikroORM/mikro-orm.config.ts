import dotenv from 'dotenv';
import { Options } from "@mikro-orm/core"
import { TsMorphMetadataProvider } from "@mikro-orm/reflection"
import { PostgreSqlDriver } from "@mikro-orm/postgresql"
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';
import { DocuFileSchema } from "../../../../Documents/Infrastructure/Repositories/MikroORM/schemas/DocuFileSchema";
import { UserSchema } from "../../../../Users/Infrastructure/Repositories/MikroORM/schemas/UserSchema";
import { AuthSchema } from '../../../../Auth/Infrastructure/Repositories/MikroORM/schemas/AuthSchema';
import { Migration20240529144115_InitialSchema } from '../../../../../../database/migrations/Migration20240529144115_InitialSchema';
import { Migration20240530181153_AddPermissionsToUsers } from '../../../../../../database/migrations/Migration20240530181153_AddPermissionsToUsers';
import { ApiKeySchema } from '../../../../Auth/Infrastructure/Repositories/MikroORM/schemas/ApiKeySchema';
import { Migration20240614104535_AddApiKeysTable } from '../../../../../../database/migrations/Migration20240614104535_AddApiKeysTable';

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
        UserSchema,
        AuthSchema,
        ApiKeySchema,
    ],
    migrations: {
        pathTs: './src/database/migrations',
        migrationsList: [
            {
                name: 'InitialSchema',
                class: Migration20240529144115_InitialSchema
            },
            {
                name: 'AddPermissionsToUsers',
                class: Migration20240530181153_AddPermissionsToUsers
            },
            {
                name: 'AddApiKeysTable',
                class: Migration20240614104535_AddApiKeysTable
            }
        ],
    },
    seeder: {
        pathTs: './src/database/seeds',
        defaultSeeder: 'CreateMasterUserSeeder',
    }
}

export default globalMikroORMConfig;