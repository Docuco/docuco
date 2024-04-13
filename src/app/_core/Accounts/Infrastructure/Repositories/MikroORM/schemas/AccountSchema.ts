import { BigIntType, EntitySchema, types } from "@mikro-orm/core";
import { AccountPrimitive } from "../../../../Domain/Primitives/AccountPrimitive";

export const AccountSchema = new EntitySchema<AccountPrimitive>({
    name: 'Account',
    properties: {
        email: { type: types.string, primary: true },
        password: { type: types.string },
        settings: {
            kind: 'embedded',
            entity: 'Settings',
            object: true,
            prefix: false,
        },
        createdAt: { type: new BigIntType('number') },
        updatedAt: { type: new BigIntType('number') },
    },
})
