import { IconFile, IconFileTypeBmp, IconFileTypeCsv, IconFileTypeDoc, IconFileTypeDocx, IconFileTypeJpg, IconFileTypePdf, IconFileTypePng, IconFileTypePpt, IconFileTypeSvg, IconFileTypeTxt, IconFileTypeXls, IconFileTypeZip } from "@tabler/icons-react";
import { DocuMimeType, DocuMimeTypeType } from "../../_core/Documents/Domain/VOs/DocuMimeType";

export function getFileTypeIcon(mimeType: DocuMimeTypeType): JSX.Element {
    const size = 32;
    const stroke = 1.3;

    const icons = { // TODO: improve type safety
        [DocuMimeType.EXTENSIONS_MIME_TYPES.csv]: <IconFileTypeCsv size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.txt]: <IconFileTypeTxt size = { size } stroke = { stroke } />,

        [DocuMimeType.EXTENSIONS_MIME_TYPES.doc]: <IconFileTypeDoc size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.xls]: <IconFileTypeXls size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.ppt]: <IconFileTypePpt size={ size } stroke = { stroke } />,

        [DocuMimeType.EXTENSIONS_MIME_TYPES.docx]: <IconFileTypeDocx size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.xlsx]: <IconFileTypeXls size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.pptx]: <IconFileTypePpt size={ size } stroke = { stroke } />,

        [DocuMimeType.EXTENSIONS_MIME_TYPES.odt]: <IconFileTypeDoc size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.ods]: <IconFileTypeXls size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.odp]: <IconFileTypePpt size={ size } stroke = { stroke } />,

        [DocuMimeType.EXTENSIONS_MIME_TYPES.pdf]: <IconFileTypePdf size={ size } stroke = { stroke } />,

        [DocuMimeType.EXTENSIONS_MIME_TYPES["7z"]]: <IconFile size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.gz]: <IconFile size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.rar]: <IconFile size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.tar]: <IconFile size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.zip]: <IconFileTypeZip size={ size } stroke = { stroke } />,

        [DocuMimeType.EXTENSIONS_MIME_TYPES.azw]: <IconFile size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.epub]: <IconFile size={ size } stroke = { stroke } />,

        [DocuMimeType.EXTENSIONS_MIME_TYPES.avif]: <IconFile size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.bmp]: <IconFileTypeBmp size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.gif]: <IconFile size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.jpeg]: <IconFileTypeJpg size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.jpg]: <IconFileTypeJpg size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.png]: <IconFileTypePng size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.svg]: <IconFileTypeSvg size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.tif]: <IconFile size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.tiff]: <IconFile size={ size } stroke = { stroke } />,
        [DocuMimeType.EXTENSIONS_MIME_TYPES.webp]: <IconFile size={ size } stroke = { stroke } />,
    }

return icons[mimeType] || <IconFileTypeDoc />;
}