import { Option } from "../../../Shared/Domain/VOs/Option";
import { DocuFileFiltersPrimitives } from "../Primitives/DocuFileFiltersPrimitives";
import { DocuExtensionType, DocuMimeType } from "./DocuMimeType";

export class DocuFileFilters {

    constructor(
        private _mimeType: Option<DocuMimeType>,
    ) {}

    get mimeType(): Option<DocuMimeType> {
        return this._mimeType;
    }

    static fromPrimitives(primitives: DocuFileFiltersPrimitives): DocuFileFilters {
        return new DocuFileFilters(
            primitives.mimeType ? Option.some(DocuMimeType.fromExtension(primitives.mimeType as DocuExtensionType)) : Option.none()
        );
    }

    toPrimitives(): DocuFileFiltersPrimitives {
        return {
            mimeType: this._mimeType.map(mimeType => mimeType.extension).getOrUndefined(),
        };
    }

}