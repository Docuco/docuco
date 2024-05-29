import { DocuFile } from "../../Domain/Entities/DocuFile";
import { DocuFileRepository } from "../../Domain/Repositories/DocuFileRepository";
import { FilterQuery, MikroORM } from "@mikro-orm/core";
import { DocuFilePrimitive } from "../../Domain/Primitives/DocuFilePrimitive";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { DocuFileFilters } from "../../Domain/VOs/DocuFileFilters";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { SharedToken } from "../../Domain/VOs/ShareToken";

export class PostgreSQLDocuFileRepository implements DocuFileRepository {

    constructor(private orm: MikroORM) {
    }

    private get repository() {
        const fork = this.orm.em.fork().getRepository<DocuFilePrimitive>('DocuFiles');

        return fork;
    }

    async save(docuFile: DocuFile): Promise<void> {
        this.repository.upsert(docuFile.toPrimitives());
    }

    async getAll({filters}: {filters: Option<DocuFileFilters>}): Promise<DocuFile[]> {
        const filterQuery = this.mapFilterToMikroORM(filters);

        const results = await this.repository.find(
            Object.assign({
                isDeleted: false,
            }, filterQuery)
        );
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

    async findBySharedToken(sharedToken: SharedToken): Promise<DocuFile | null> {
        const result = await this.repository.findOne({
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