import { BigIntType, EntitySchema, types } from "@mikro-orm/core";
import { AccountPrimitive } from "../../../../Domain/Primitives/AccountPrimitive";

export const AccountSchema = new EntitySchema<AccountPrimitive>({
    name: 'Accounts',
    properties: {
        id: { type: types.string, primary: true },
        email: { type: types.string },
        createdAt: { type: new BigIntType('number') },
        updatedAt: { type: new BigIntType('number') },
    },
})
