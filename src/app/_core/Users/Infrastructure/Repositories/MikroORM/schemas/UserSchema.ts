import { BigIntType, EntitySchema, types } from "@mikro-orm/core";
import { UserPrimitive } from "../../../../Domain/Primitives/UserPrimitive";

export const UserSchema = new EntitySchema<UserPrimitive>({
    name: 'Users',
    properties: {
        id: { type: types.string, primary: true },
        email: { type: types.string },
        createdAt: { type: new BigIntType('number') },
        updatedAt: { type: new BigIntType('number') },
    },
})
