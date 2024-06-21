import { SharedToken } from "../../../Shared/Domain/VOs/ShareToken";
import { AggregateRoot } from "../../../Shared/Domain/AggregateRoot";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { CreateFolderDTO } from "../../Application/DTOs/CreateFolderDTO";
import { FolderCreated } from "../Events/FolderCreated";
import { FolderPrimitive } from "../Primitives/FolderPrimitive";

export class Folder extends AggregateRoot {

    constructor(
        private _id: Id,
        private _name: string,
        private _folderParentId: Option<Id>,
        private _isDeleted: boolean,
        private _sharedToken: Option<SharedToken>,
        private _createdAt: Date,
        private _updatedAt: Date
    ) {
        super();
    }

    get id(): Id {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get folderParentId(): Option<Id> {
        return this._folderParentId;
    }

    get isDeleted(): boolean {
        return this._isDeleted;
    }

    get sharedToken(): Option<SharedToken> {
        return this._sharedToken;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    static create(folderDTO: CreateFolderDTO) {
        const primitive: FolderPrimitive = {
            id: Id.generate().value,
            name: folderDTO.name,
            folderParentId: folderDTO.folderParentId,
            isDeleted: false,
            sharedToken: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        const folder = Folder.fromPrimitives(primitive);

        folder.record(new FolderCreated({
            entityId: folder._id.value,
            attributes: folder.toPrimitives(),
        }));

        return folder;
    }

    static fromPrimitives(primitives: FolderPrimitive): Folder {
        return new Folder(
            new Id(primitives.id),
            primitives.name,
            Option.fromValue(primitives.folderParentId).map((id) => new Id(id)),
            primitives.isDeleted,
            Option.fromValue(primitives.sharedToken).map((token) => new SharedToken(token)),
            new Date(primitives.createdAt),
            new Date(primitives.updatedAt),
        );
    }

    public toPrimitives(): FolderPrimitive {
        return {
            id: this._id.value,
            name: this._name,
            folderParentId: this._folderParentId.map((id) => id.value).getOrNull(),
            isDeleted: this._isDeleted,
            sharedToken: this._sharedToken.map((token) => token.value).getOrNull(),
            createdAt: this._createdAt.getTime(),
            updatedAt: this._updatedAt.getTime(),
        }
        
    }
}