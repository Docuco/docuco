import { BigIntType, EntitySchema, types } from "@mikro-orm/core";
import { FolderPrimitive } from "../../../../Domain/Primitives/FolderPrimitive";

export const FolderSchema = new EntitySchema<FolderPrimitive>({
    name: 'Folders',
    properties: {
        id: { type: types.string, primary: true },
        name: { type: types.string },
        folderParentId: { type: types.string, nullable: true },
        isDeleted: { type: types.boolean, default: false },
        createdAt: { type: new BigIntType('number') },
        updatedAt: { type: new BigIntType('number') },
    },
})
