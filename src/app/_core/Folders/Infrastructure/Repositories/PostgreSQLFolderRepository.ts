import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/core";
import { FolderRepository } from "../../Domain/Repositories/FolderRepository";
import { FolderPrimitive } from "../../Domain/Primitives/FolderPrimitive";
import { Folder } from "../../Domain/Entities/Folder";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";

export class PostgreSQLFolderRepository implements FolderRepository {

    constructor(private orm: MikroORM) {
    }

    private get em() {
        return this.orm.em.fork()
    }

    private getRepository(em: EntityManager) {
        const fork = em.getRepository<FolderPrimitive>('Folders');

        return fork;
    }

    async save(folder: Folder): Promise<void> {
        this.getRepository(this.em).upsert(folder.toPrimitives());
    }

    async getAll({ folderParentId }: { folderParentId: Option<Id> }): Promise<Folder[]> {
        const results = await this.getRepository(this.em).find({
            folderParentId: folderParentId.map(id => id.value).getOrNull(),
        });
        
        return results.map((result) => Folder.fromPrimitives(result));
    }

    async findById(id: Id): Promise<Option<Folder>> {
        const result = await this.getRepository(this.em).findOne({ id: id.value });

        if (!result) {
            return Option.none();
        }

        return Option.some(Folder.fromPrimitives(result));
    }

    // async getDeleted(): Promise<DocuFile[]> {
    //     const results = await this.getRepository(this.em).find({
    //         isDeleted: true,
    //     });
    //     return results.map((result) => DocuFile.fromPrimitives(result));
    // }

    // async findById(id: Id): Promise<Option<DocuFile>> {
    //     const result = await this.getRepository(this.em).findOne({ id: id.value });

    //     if (!result) {
    //         return Option.none();
    //     }

    //     return Option.some(DocuFile.fromPrimitives(result));
    // }

    // async delete(docuFile: DocuFile): Promise<void> {
    //     await this.getRepository(this.em).nativeDelete({ id: docuFile.id.value });
    // }

    // async findBySharedToken(sharedToken: SharedToken): Promise<Option<DocuFile>> {
    //     const result = await this.getRepository(this.em).findOne({
    //         sharedToken: sharedToken.value,
    //     });

    //     if (!result) {
    //         return Option.none();
    //     }

    //     return Option.some(DocuFile.fromPrimitives(result));
    // }

    // private mapFilterToMikroORM(filters: Option<DocuFileFilters>): FilterQuery<DocuFilePrimitive> {
    //     let filterQuery: FilterQuery<DocuFilePrimitive> = {};

    //     if (filters.isNone()) {
    //         return {};
    //     }
    //     const filter = filters.get();

    //     const mimeType = filter.mimeType.map((mimeType) => mimeType.value).getOrUndefined();
    //     if (mimeType) { filterQuery.mimeType = mimeType }

    //     return filterQuery;
    // }
}