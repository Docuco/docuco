import { BigIntType, EntitySchema, types } from "@mikro-orm/core";
import { AuthPrimitive } from "../../../../Domain/Primitives/AuthPrimitive";

export const AuthSchema = new EntitySchema<AuthPrimitive>({
    name: 'Auth',
    properties: {
        id: { type: types.string, primary: true },
        accountId: { type: types.string },
        password: { type: types.string },
        createdAt: { type: new BigIntType('number') },
        updatedAt: { type: new BigIntType('number') },
    },
})
