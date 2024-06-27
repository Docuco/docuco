import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/core";
import { FolderRepository } from "../../Domain/Repositories/FolderRepository";
import { FolderPrimitive } from "../../Domain/Primitives/FolderPrimitive";
import { Folder } from "../../Domain/Entities/Folder";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { FolderAncestorsDTO } from "../../Application/DTOs/FolderAncestorsDTO";

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
            isDeleted: false,
        });
        
        return results.map((result) => Folder.fromPrimitives(result));
    }

    async getDeleted({ folderParentId }: { folderParentId: Option<Id> }): Promise<Folder[]> {
        const results = await this.getRepository(this.em).find({
            folderParentId: folderParentId.map(id => id.value).getOrNull(),
            isDeleted: true,
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

    async findByParentId(id: Id): Promise<Folder[]> {
        const results = await this.getRepository(this.em).find({
            folderParentId: id.value,
        });

        return results.map((result) => Folder.fromPrimitives(result));
    }

    async getAncestors(id: Id): Promise<Option<FolderAncestorsDTO>> {
        const folder = await this.findById(id);
        if (folder.isNone()) {
            return Option.none();
        }
        
        let allHierarchy = [folder.get()]
        
        const hasParent = folder.get().folderParentId.isSome();
        if (!hasParent) {
            return Option.some(this.mapFoldersToAncestorsDTO(allHierarchy)!);
        }

        let parent = await this.getParentFolder(folder.get());
        while (parent.isSome()) {
            allHierarchy.push(parent.get());
            parent = await this.getParentFolder(parent.get());
        }

        return Option.some(this.mapFoldersToAncestorsDTO(allHierarchy)!);
    }

    private async getParentFolder(folder: Folder): Promise<Option<Folder>> {
        if (folder.folderParentId.isNone()) {
            return Option.none();
        }

        return this.findById(folder.folderParentId.get());
    }

    private mapFoldersToAncestorsDTO(folders: Folder[], parent: Option<Folder> = Option.none()): FolderAncestorsDTO | null {
        const childrenFolder = folders.find(folder => {
            return (parent.isSome() && folder.folderParentId.isSome() && folder.folderParentId.get().equals(parent.get().id))
                || (parent.isNone() && folder.folderParentId.isNone())
        });

        if (childrenFolder === undefined) {
            return null
        }

        return {
            ...childrenFolder.toPrimitives(),
            folderChildren: this.mapFoldersToAncestorsDTO(folders, Option.some(childrenFolder)),
        }
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