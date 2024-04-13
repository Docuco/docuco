import { Id } from "../../../Shared/VOs/Id";
import { DocuFilePrimitive } from "../Primitives/DocuFilePrimitive";
import { ContentFile } from "./ContentFile";
import { DocuFileCreated } from "../Events/DocuFileCreated";
import { AggregateRoot } from "../../../Shared/Domain/AggregateRoot";
import { DocuFileDeleted } from "../Events/DocuFileDeleted";
import { DocuFileRestored } from "../Events/DocuFileRestored";

export class DocuFile extends AggregateRoot {
    
    constructor(
        private _id: Id,
        private _name: string,
        private _mimeType: string,
        private _sizeInBytes: number,
        private _extension: string | null,
        private _url: string,
        private _isDeleted: boolean,
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

    get mimeType(): string {
        return this._mimeType;
    }

    get sizeInBytes(): number {
        return this._sizeInBytes;
    }

    get extension(): string | null {
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

    get fullname(): string {
        return `${this._name}-${this._id.value}.${this._extension}`;
    }

    static create({ file, url }: { file: ContentFile, url: string}) {
        const primitive: DocuFilePrimitive = {
            id: file.id.value,
            name: file.name,
            mimeType: file.mimeType,
            sizeInBytes: file.sizeInBytes,
            extension: file.extension,
            url,
            isDeleted: false,
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

    delete(): void {
        if (this._isDeleted) {
            return
        }

        this._isDeleted = true;

        this.record(new DocuFileDeleted({
            entityId: this.id.value,
            attributes: this.toPrimitives(),
        }));
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

    static fromPrimitives(primitives: DocuFilePrimitive) {
        return new DocuFile(
            new Id(primitives.id),
            primitives.name,
            primitives.mimeType,
            primitives.sizeInBytes,
            primitives.extension,
            primitives.url,
            primitives.isDeleted,
            new Date(primitives.createdAt),
            new Date(primitives.updatedAt),
        );
    }

    toPrimitives(): DocuFilePrimitive {
        return {
            id: this._id.value,
            name: this._name,
            mimeType: this._mimeType,
            sizeInBytes: this._sizeInBytes,
            extension: this._extension,
            url: this._url,
            isDeleted: this._isDeleted,
            createdAt: this._createdAt.getTime(),
            updatedAt: this._updatedAt.getTime(),
        };
    }
}