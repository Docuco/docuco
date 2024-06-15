import { BigIntType, EntitySchema, types } from "@mikro-orm/core";
import { ApiKeyPrimitive } from "../../../../Domain/Primitives/ApiKeyPrimitive";
import { Permission } from "../../../../../Shared/Domain/VOs/Permission";

export const ApiKeySchema = new EntitySchema<ApiKeyPrimitive>({
    name: 'ApiKeys',
    properties: {
        id: { type: types.string, primary: true },
        creatorId: { type: types.string },
        name: { type: types.string },
        description: { type: types.text, nullable: true },
        apiKeyValue: { type: types.string, unique: true },
        permissions: { type: types.enumArray, items: Permission.ValidValues },
        createdAt: { type: new BigIntType('number') },
        updatedAt: { type: new BigIntType('number') },
    },
})
