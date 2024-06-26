import { DocuFilePrimitive } from "../Primitives/DocuFilePrimitive";
import { ContentFile } from "./ContentFile";
import { DocuFileCreated } from "../Events/DocuFileCreated";
import { AggregateRoot } from "../../../Shared/Domain/AggregateRoot";
import { DocuFileDeleted } from "../Events/DocuFileDeleted";
import { DocuFileRestored } from "../Events/DocuFileRestored";
import { DocuMimeType, DocuMimeTypeType } from "../VOs/DocuMimeType";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { SharedToken } from "../../../Shared/Domain/VOs/ShareToken";
import { DocuFileHasStoppedBeingShared } from "../Events/DocuFileHasStoppedBeingShared";
import { DocuFileHasStartedToBeShared } from "../Events/DocuFileHasStartedToBeShared";
import { DocuFileUnlinkedFromParent } from "../Events/DocuFileUnlinkedFromParent";

export class DocuFile extends AggregateRoot {
    
    constructor(
        private _id: Id,
        private _name: string,
        private _parentFolderId: Option<Id>,
        private _mimeType: DocuMimeType,
        private _sizeInBytes: number,
        private _extension: Option<string>,
        private _url: string,
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

    get parentFolderId(): Option<Id> {
        return this._parentFolderId;
    }

    get mimeType(): DocuMimeType {
        return this._mimeType;
    }

    get sizeInBytes(): number {
        return this._sizeInBytes;
    }

    get extension(): Option<string> {
        return this._extension;
    }

    get url(): string {
        return this._url;
    }

    get isDeleted(): boolean {
        return this._isDeleted;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }
    
    static create({ file, url, parentFolderId }: { file: ContentFile, url: string, parentFolderId: string | null }) {
        const primitive: DocuFilePrimitive = {
            id: file.id.value,
            name: file.name,
            parentFolderId,
            mimeType: file.mimeType as DocuMimeTypeType,
            sizeInBytes: file.sizeInBytes,
            extension: file.extension.getOrNull(),
            url,
            isDeleted: false,
            sharedToken: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        const document = DocuFile.fromPrimitives(primitive);

        document.record(new DocuFileCreated({
            entityId: document.id.value,
            attributes: document.toPrimitives(),
        }));

        return document;
    }

    unlinkFromParent(): void {
        this._parentFolderId = Option.none();

        this.record(new DocuFileUnlinkedFromParent({
            entityId: this.id.value,
            attributes: this.toPrimitives(),
        }));
    }

    delete(): void {
        if (this._isDeleted) {
            return
        }

        this._isDeleted = true;

        this.record(new DocuFileDeleted({
            entityId: this.id.value,
            attributes: this.toPrimitives(),
        }));

        this.stopSharing();
    }

    restore(): void {
        if (!this._isDeleted) {
            return
        }

        this._isDeleted = false;

        this.record(new DocuFileRestored({
            entityId: this.id.value,
            attributes: this.toPrimitives(),
        }));
    }

    startSharing(): void {
        if (this._sharedToken.isSome()) {
            return;
        }

        this._sharedToken = Option.some(SharedToken.generate());

        this.record(new DocuFileHasStartedToBeShared({
            entityId: this.id.value,
            attributes: this.toPrimitives(),
        }));
    }

    stopSharing(): void {
        if (this._sharedToken.isNone()) {
            return;
        }

        this._sharedToken = Option.none();

        this.record(new DocuFileHasStoppedBeingShared({
            entityId: this.id.value,
            attributes: this.toPrimitives(),
        }));
    }

    static fromPrimitives(primitives: DocuFilePrimitive) {
        return new DocuFile(
            new Id(primitives.id),
            primitives.name,
            Option.fromValue(primitives.parentFolderId).map(parentFolderId => new Id(parentFolderId)),
            new DocuMimeType(primitives.mimeType),
            primitives.sizeInBytes,
            Option.fromValue(primitives.extension),
            primitives.url,
            primitives.isDeleted,
            Option.fromValue(primitives.sharedToken).map(sharedToken => new SharedToken(sharedToken)),
            new Date(primitives.createdAt),
            new Date(primitives.updatedAt),
        );
    }

    toPrimitives(): DocuFilePrimitive {
        return {
            id: this._id.value,
            name: this._name,
            parentFolderId: this._parentFolderId.map((id) => id.value).getOrNull(),
            mimeType: this._mimeType.value,
            sizeInBytes: this._sizeInBytes,
            extension: this._extension.getOrNull(),
            url: this._url,
            isDeleted: this._isDeleted,
            sharedToken: this._sharedToken.map((token) => token.value).getOrNull(),
            createdAt: this._createdAt.getTime(),
            updatedAt: this._updatedAt.getTime(),
        };
    }
}