import { DocuFile } from "../../Domain/Entities/DocuFile";
import { DocuFileRepository } from "../../Domain/Contracts/DocuFileRepository";
import { MikroORM } from "@mikro-orm/core";
import { DocuFilePrimitive } from "../../Domain/Primitives/DocuFilePrimitive";
import { Id } from "../../../Shared/VOs/Id";

export class SQLiteDocuFileRepository implements DocuFileRepository {

    constructor(private orm: MikroORM) {
    }

    private get repository() {
        const fork = this.orm.em.fork().getRepository<DocuFilePrimitive>('DocuFile');

        return fork;
    }

    async save(docuFile: DocuFile): Promise<void> {
        this.repository.upsert(docuFile.toPrimitives());
    }

    async getAll(): Promise<DocuFile[]> {
        const results = await this.repository.find({
            isDeleted: false,
        });
        return results.map((result) => DocuFile.fromPrimitives(result));
    }

    async getDeleted(): Promise<DocuFile[]> {
        const results = await this.repository.find({
            isDeleted: true,
        });
        return results.map((result) => DocuFile.fromPrimitives(result));
    }

    async find(id: Id): Promise<DocuFile | null> {
        const result = await this.repository.findOne({ id: id.value });

        if (!result) {
            return null;
        }

        return DocuFile.fromPrimitives(result);
    }

    async delete(docuFile: DocuFile): Promise<void> {
        await this.repository.nativeDelete({id: docuFile.id.value});
    }
}