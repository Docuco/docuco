import { DocuFile } from "../../Domain/Entities/DocuFile";
import { DocuFileRepository } from "../../Domain/Repositories/DocuFileRepository";
import { FilterQuery, MikroORM } from "@mikro-orm/core";
import { DocuFilePrimitive } from "../../Domain/Primitives/DocuFilePrimitive";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { DocuFileFilters } from "../../Domain/VOs/DocuFileFilters";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { SharedToken } from "../../../Shared/Domain/VOs/ShareToken";
import { EntityManager } from "@mikro-orm/core";
import { Folder } from "../../../Folders/Domain/Entities/Folder";

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
        this.getRepository(this.em).upsert(docuFile.toPrimitives());
    }

    async getAll({ parentFolderId, filters }: { parentFolderId: Option<Id>, filters: Option<DocuFileFilters>}): Promise<DocuFile[]> {
        const filterQuery = this.mapFilterToMikroORM(filters);

        const results = await this.getRepository(this.em).find(
            Object.assign({
                isDeleted: false,
                parentFolderId: parentFolderId.map((id) => id.value).getOrNull(),
            }, filterQuery) as FilterQuery<DocuFilePrimitive>
        );
        return results.map((result) => DocuFile.fromPrimitives(result));
    }

    async getDeleted({ parentFolderId }: { parentFolderId: Option<Id> }): Promise<DocuFile[]> {
        const results = await this.getRepository(this.em).find({
            parentFolderId: parentFolderId.map((id) => id.value).getOrNull(),
            isDeleted: true,
        });
        return results.map((result) => DocuFile.fromPrimitives(result));
    }

    async findById(id: Id): Promise<Option<DocuFile>> {
        const result = await this.getRepository(this.em).findOne({ id: id.value });

        if (!result) {
            return Option.none();
        }

        return Option.some(DocuFile.fromPrimitives(result));
    }

    async findByParent(parentFolder: Folder): Promise<DocuFile[]> {
        const results = await this.getRepository(this.em).find({
            parentFolderId: parentFolder.id.value,
        });

        return results.map((result) => DocuFile.fromPrimitives(result));
    }

    async delete(docuFile: DocuFile): Promise<void> {
        await this.getRepository(this.em).nativeDelete({ id: docuFile.id.value });
    }

    async findBySharedToken(sharedToken: SharedToken): Promise<Option<DocuFile>> {
        const result = await this.getRepository(this.em).findOne({
            sharedToken: sharedToken.value,
        });

        if (!result) {
            return Option.none();
        }

        return Option.some(DocuFile.fromPrimitives(result));
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