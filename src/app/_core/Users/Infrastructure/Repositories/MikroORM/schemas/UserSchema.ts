import { BigIntType, EntitySchema, types } from "@mikro-orm/core";
import { UserPrimitive } from "../../../../Domain/Primitives/UserPrimitive";
import { Permission } from "../../../../../Shared/Domain/VOs/Permission";

export const UserSchema = new EntitySchema<UserPrimitive>({
    name: 'Users',
    properties: {
        id: { type: types.string, primary: true },
        email: { type: types.string },
        permissions: { type: types.enumArray, items: Permission.ValidValues},
        createdAt: { type: new BigIntType('number') },
        updatedAt: { type: new BigIntType('number') },
    },
})
