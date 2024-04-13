import { BigIntType, EntitySchema, types } from "@mikro-orm/core";
import { DocuFilePrimitive } from "../../../../Domain/Primitives/DocuFilePrimitive";

export const DocuFileSchema = new EntitySchema<DocuFilePrimitive>({
    name: 'DocuFile',
    properties: {
        id: { type: types.string, primary: true },
        name: { type: types.string },
        mimeType: { type: types.string },
        sizeInBytes: { type: types.integer },
        extension: { type: types.string, nullable: true },
        url: { type: types.string },
        isDeleted: { type: types.boolean, default: false },
        createdAt: { type: new BigIntType('number') },
        updatedAt: { type: new BigIntType('number') },
    },
})
