import { BigIntType, EntitySchema } from "@mikro-orm/core";
import { SettingsPrimitive } from "../../../../Domain/Primitives/SettingsPrimitive";
import { Database } from "../../../../Domain/VOs/Database";
import { Store } from "../../../../Domain/VOs/Store";

export const SettingsSchema = new EntitySchema<SettingsPrimitive>({
    name: 'Settings',
    embeddable: true,
    properties: {
        database: { enum: true, items: Database.ValidValues },
        store: { enum: true, items: Store.ValidValues },
        updatedAt: { type: new BigIntType('number') },
    },
})
