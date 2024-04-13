import { OptionalSettingsPrimitive, SettingsPrimitive } from "../Primitives/SettingsPrimitive";
import { Database, DatabaseType } from "./Database";
import { Store, StoreType } from "./Store";

export class Settings {

    constructor(
        private _database: Database,
        private _store: Store,
        private _updatedAt: Date
    ) {
    }

    change(newSettings: OptionalSettingsPrimitive): Settings  {
        return new Settings(
            newSettings.database ? new Database(newSettings.database as DatabaseType) : this._database,
            newSettings.store ? new Store(newSettings.store as StoreType) : this._store,
            new Date()
        );
    }

    static default(): Settings {
        return new Settings(
            new Database('SQLite'),
            new Store('InMemory'),
            new Date()
        );
    }

    static fromPrimitives(primitives: SettingsPrimitive) {
        return new Settings(
            new Database(primitives.database),
            new Store(primitives.store),
            new Date(primitives.updatedAt),
        );
    }

    toPrimitives(): SettingsPrimitive {
        return {
            database: this._database.value,
            store: this._store.value,
            updatedAt: this._updatedAt.getTime(),
        };
    }
}