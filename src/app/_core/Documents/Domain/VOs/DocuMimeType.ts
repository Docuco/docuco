import { EnumValueObject } from '../../../Shared/Domain/VOs/EnumValueObject';
import { Mutable } from '../../../Shared/Domain/VOs/Mutable';
import { InvalidMimeType } from '../Exceptions/InvalidMimeType';

export type DocuMimeTypeType = (typeof DocuMimeType.ValidValues)[number];
export type DocuExtensionType = 'csv' | 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'odt';

export class DocuMimeType extends EnumValueObject<DocuMimeTypeType> {
    
    protected static readonly OPTIONS = [
        'text/csv',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.oasis.opendocument.text',
    ] as const;

    public static readonly MIME_TYPES_EXTENSIONS: { [key in DocuMimeTypeType]: DocuExtensionType } = {
        'text/csv': 'csv',
        'application/pdf': 'pdf',
        'application/msword': 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/vnd.ms-excel': 'xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'application/vnd.oasis.opendocument.text': 'odt',
    };

    public static readonly EXTENSIONS_MIME_TYPES: { [key in DocuExtensionType]: DocuMimeTypeType } = {
        'csv': 'text/csv',
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xls': 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'odt': 'application/vnd.oasis.opendocument.text',
    };

    get extension(): DocuExtensionType {
        return DocuMimeType.MIME_TYPES_EXTENSIONS[this.value];
    }

    public static readonly ValidValues = DocuMimeType.OPTIONS as Mutable<typeof DocuMimeType.OPTIONS>;

    constructor(_value: DocuMimeTypeType) {
        super(_value, DocuMimeType.ValidValues);
    }

    static fromExtension(extension: DocuExtensionType): DocuMimeType {
        const mimeType = DocuMimeType.OPTIONS.find(mimeType => (
            DocuMimeType.MIME_TYPES_EXTENSIONS[mimeType] === extension)
        ) as DocuMimeTypeType
        
        return new DocuMimeType(mimeType);
    }

    static isValid(value: DocuMimeTypeType): boolean {
        return DocuMimeType.ValidValues.includes(value);
    }

    protected throwErrorForInvalidValue(value: DocuMimeTypeType): void {
        throw new InvalidMimeType(value);
    }

}
