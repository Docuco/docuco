export const API_ROUTES = {
    DOCUMENTS: `${process.env.NEXT_PUBLIC_API_URL}/documents`,
    DOCUMENT: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}`,
    DOCUMENTS_DELETED: `${process.env.NEXT_PUBLIC_API_URL}/documents/deleted`,
    DOCUMENT_DELETED: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/deleted/${id}`,
    DOCUMENT_RESTORE: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}/restore`,
    ACCOUNT: (email: string) => `${process.env.NEXT_PUBLIC_API_URL}/accounts/${email}`,
};