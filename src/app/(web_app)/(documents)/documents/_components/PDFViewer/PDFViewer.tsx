'use client'

import { useEffect } from 'react';
import classes from './PDFViewer.module.css';
import { DocuFilePrimitive } from '../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive';
import PDFObject from 'pdfobject';

export function PDFViewer({
    id,
    docuFile,
}: {
    id: string,
    docuFile: DocuFilePrimitive
}) {
    useEffect(() => {
        PDFObject.embed(docuFile.url, `#${id}`, {
            width: '100%',
            height: '100%',
            pdfOpenParams: {
                view: 'FitH',
                pagemode: 'thumbs',
                search: 'open',
                toolbar: 1,
                statusbar: 1,
                messages: 1,
                scrollbar: 1,
                scroll: 1,
                navpanes: 0,
            },
        })
    }, [docuFile, id]);

    return (
        <>
            <div id={id} className={classes.pdf_container}></div>
        </>
    );
}