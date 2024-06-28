import { EnumValueObject } from '../../../Shared/Domain/VOs/EnumValueObject';
import { Mutable } from '../../../Shared/Domain/VOs/Mutable';
import { InvalidMimeType } from '../Exceptions/InvalidMimeType';

export type DocuMimeTypeType = (typeof DocuMimeType.ValidValues)[number];
export const DocuExtensionValue = ['csv', 'txt', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'odt', 'ods', 'odp', 'pdf', '7z', 'gz', 'rar', 'tar', 'zip', 'azw', 'epub', 'avif', 'bmp', 'gif', 'jpeg', 'jpg', 'png', 'svg', 'tif', 'tiff', 'webp']
export type DocuExtensionType = (typeof DocuExtensionValue)[number];

export class DocuMimeType extends EnumValueObject<DocuMimeTypeType> {
    
    protected static readonly OPTIONS = [
        'text/csv',
        'text/plain',

        'application/msword',
        'application/vnd.ms-excel',
        'application/vnd.ms-powerpoint',

        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',

        'application/vnd.oasis.opendocument.text',
        'application/vnd.oasis.opendocument.spreadsheet',
        'application/vnd.oasis.opendocument.presentation',

        'application/pdf',

        'application/x-7z-compressed',
        'application/gzip',
        'application/vnd.rar',
        'application/x-tar',
        'application/zip',

        'application/vnd.amazon.ebook',
        'application/epub+zip',

        'image/avif',
        'image/bmp',
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'image/tiff',
        'image/webp',
    ] as const;

    public static readonly MIME_TYPES_EXTENSIONS: { [key in DocuMimeTypeType]: DocuExtensionType } = {
        'text/csv': 'csv',
        'text/plain': 'txt',

        'application/msword': 'doc',
        'application/vnd.ms-excel': 'xls',
        'application/vnd.ms-powerpoint': 'ppt',

        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',

        'application/vnd.oasis.opendocument.text': 'odt',
        'application/vnd.oasis.opendocument.spreadsheet': 'ods',
        'application/vnd.oasis.opendocument.presentation': 'odp',

        'application/pdf': 'pdf',
        
        'application/x-7z-compressed': '7z',
        'application/gzip': 'gz',
        'application/vnd.rar': 'rar',
        'application/x-tar': 'tar',
        'application/zip': 'zip',

        'application/vnd.amazon.ebook': 'azw',
        'application/epub+zip': 'epub',

        'image/avif': 'avif',
        'image/bmp': 'bmp',
        'image/gif': 'gif',
        'image/jpeg': 'jpeg',
        'image/png': 'png',
        'image/svg+xml': 'svg',
        'image/tiff': 'tiff',
        'image/webp': 'webp',
    };

    public static readonly EXTENSIONS_MIME_TYPES: { [key in DocuExtensionType]: DocuMimeTypeType } = {
        'csv': 'text/csv',
        'txt': 'text/plain',

        'doc': 'application/msword',
        'xls': 'application/vnd.ms-excel',
        'ppt': 'application/vnd.ms-powerpoint',
        
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        
        'odt': 'application/vnd.oasis.opendocument.text',
        'ods': 'application/vnd.oasis.opendocument.spreadsheet',
        'odp': 'application/vnd.oasis.opendocument.presentation',
        
        'pdf': 'application/pdf',
        
        '7z': 'application/x-7z-compressed',
        'gz': 'application/gzip',
        'rar': 'application/vnd.rar',
        'tar': 'application/x-tar',
        'zip': 'application/zip',
        
        'azw': 'application/vnd.amazon.ebook',
        'epub': 'application/epub+zip',
        
        'avif': 'image/avif',
        'bmp': 'image/bmp',
        'gif': 'image/gif',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'svg': 'image/svg+xml',
        'tif': 'image/tiff',
        'tiff': 'image/tiff',
        'webp': 'image/webp',
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
