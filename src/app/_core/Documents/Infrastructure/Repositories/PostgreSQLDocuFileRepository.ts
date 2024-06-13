import { DocuFile } from "../../Domain/Entities/DocuFile";
import { DocuFileRepository } from "../../Domain/Repositories/DocuFileRepository";
import { FilterQuery, MikroORM } from "@mikro-orm/core";
import { DocuFilePrimitive } from "../../Domain/Primitives/DocuFilePrimitive";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { DocuFileFilters } from "../../Domain/VOs/DocuFileFilters";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { SharedToken } from "../../Domain/VOs/ShareToken";
import { EntityManager } from "@mikro-orm/core";

export class PostgreSQLDocuFileRepository implements DocuFileRepository {

    constructor(private orm: MikroORM) {
    }

    private get em() {
        return this.orm.em.fork()
    }

    private getRepository(em: EntityManager) {
        const fork = em.getRepository<DocuFilePrimitive>('DocuFiles');

        return fork;
    }


    async save(docuFile: DocuFile): Promise<void> {
        const em = this.orm.em.fork()
        this.getRepository(em).upsert(docuFile.toPrimitives());
        this.orm.em.flush();
    }

    async getAll({filters}: {filters: Option<DocuFileFilters>}): Promise<DocuFile[]> {
        const em = this.orm.em.fork()
        const filterQuery = this.mapFilterToMikroORM(filters);

        const results = await this.getRepository(em).find(
            Object.assign({
                isDeleted: false,
            }, filterQuery)
        );
        return results.map((result) => DocuFile.fromPrimitives(result));
    }

    async getDeleted(): Promise<DocuFile[]> {
        const em = this.orm.em.fork()
        const results = await this.getRepository(em).find({
            isDeleted: true,
        });
        return results.map((result) => DocuFile.fromPrimitives(result));
    }

    async find(id: Id): Promise<DocuFile | null> {
        const em = this.orm.em.fork()
        const result = await this.getRepository(em).findOne({ id: id.value });

        if (!result) {
            return null;
        }

        return DocuFile.fromPrimitives(result);
    }

    async delete(docuFile: DocuFile): Promise<void> {
        const em = this.orm.em.fork()
        await this.getRepository(em).nativeDelete({id: docuFile.id.value});
    }

    async findBySharedToken(sharedToken: SharedToken): Promise<DocuFile | null> {
        const em = this.orm.em.fork()
        const result = await this.getRepository(em).findOne({
            sharedToken: sharedToken.value,
        });

        if (!result) {
            return null;
        }

        return DocuFile.fromPrimitives(result);
    }

    private mapFilterToMikroORM(filters: Option<DocuFileFilters>): FilterQuery<DocuFilePrimitive> {
        let filterQuery: FilterQuery<DocuFilePrimitive> = {};

        if (filters.isNone()) {
            return {};
        }
        const filter = filters.get();

        const mimeType = filter.mimeType.map((mimeType) => mimeType.value).getOrUndefined();
        if (mimeType) { filterQuery.mimeType = mimeType }

        return filterQuery;
    }
}