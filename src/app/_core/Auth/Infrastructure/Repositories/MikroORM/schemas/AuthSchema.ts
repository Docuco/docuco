import { BigIntType, EntitySchema, types } from "@mikro-orm/core";
import { AuthPrimitive } from "../../../../Domain/Primitives/AuthPrimitive";

export const AuthSchema = new EntitySchema<AuthPrimitive>({
    name: 'Auths',
    properties: {
        id: { type: types.string, primary: true },
        userId: { type: types.string },
        password: { type: types.string, nullable: true },
        createdAt: { type: new BigIntType('number') },
        updatedAt: { type: new BigIntType('number') },
    },
})
