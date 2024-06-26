import { AggregateRoot } from "../../../Shared/Domain/AggregateRoot";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { ContentFilePrimitive } from "../Primitives/ContentFilePrimitive";

export class ContentFile extends AggregateRoot {
    
    constructor(
        private _id: Id,
        private _name: string,
        private _mimeType: string,
        private _sizeInBytes: number,
        private _extension: Option<string>,
        private _content: Blob,
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

    get extension(): Option<string> {
        return this._extension;
    }

    get content(): Blob {
        return this._content;
    }

    get fullname(): string {
        return `${this._name}.${this._extension}`;
    }
    
    static create(file: File) {
        const id = Id.generate();
        const fileParts = file.name.split('.');
        const fileName = fileParts[0] ?? '';
        const fileExtension = fileParts[1] ?? null;

        return new ContentFile(
            id,
            fileName,
            file.type,
            file.size,
            Option.fromValue(fileExtension),
            new Blob([file], { type: file.type }),
        );
    }

    static fromPrimitives(primitives: ContentFilePrimitive): ContentFile {
        return new ContentFile(
            new Id(primitives.id),
            primitives.name,
            primitives.mimeType,
            primitives.sizeInBytes,
            Option.fromValue(primitives.extension),
            new Blob([primitives.content], { type: primitives.mimeType }),
        );
    }

    toPrimitives(): ContentFilePrimitive {
        return {
            id: this._id.value,
            name: this._name,
            mimeType: this._mimeType,
            sizeInBytes: this._sizeInBytes,
            extension: this._extension.getOrNull(),
            content: this._content,
        };
    }
}