export const API_ROUTES = {
    DOCUMENTS: `${process.env.NEXT_PUBLIC_API_URL}/documents`,
    DOCUMENT: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}`,
    DOCUMENTS_DELETED: `${process.env.NEXT_PUBLIC_API_URL}/documents/deleted`,
    DOCUMENT_DELETED: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/deleted/${id}`,
    DOCUMENT_RESTORE: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}/restore`,
    USER: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
    DOCUMENT_SHARE: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}/share`,
    GET_DOCUMENT_BY_SHARE_TOKEN: (sharedToken: string) => `${process.env.NEXT_PUBLIC_API_URL}/shared/documents/${sharedToken}`,
};