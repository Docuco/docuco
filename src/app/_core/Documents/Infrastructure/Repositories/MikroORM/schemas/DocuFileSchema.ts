import { BigIntType, EntitySchema, types } from "@mikro-orm/core";
import { DocuFilePrimitive } from "../../../../Domain/Primitives/DocuFilePrimitive";

export const DocuFileSchema = new EntitySchema<DocuFilePrimitive>({
    name: 'DocuFiles',
    properties: {
        id: { type: types.string, primary: true },
        name: { type: types.string },
        folderParentId: { type: types.string, nullable: true },
        mimeType: { type: types.string },
        sizeInBytes: { type: types.integer },
        extension: { type: types.string, nullable: true },
        url: { type: types.string },
        isDeleted: { type: types.boolean, default: false },
        sharedToken: { type: types.string, nullable: true },
        createdAt: { type: new BigIntType('number') },
        updatedAt: { type: new BigIntType('number') },
    },
})
