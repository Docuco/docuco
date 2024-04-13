import { DatabaseType } from "../VOs/Database";
import { StoreType } from "../VOs/Store";

export interface SettingsPrimitive {
    database: DatabaseType;
    store: StoreType,
    updatedAt: number;
}

export type OptionalSettingsPrimitive = {
    database?: string;
    store?: string;
}