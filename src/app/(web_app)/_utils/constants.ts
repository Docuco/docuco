export const API_ROUTES = {
    DOCUMENTS: `${process.env.NEXT_PUBLIC_API_URL}/documents`,
    DOCUMENT: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}`,
    DOCUMENTS_DELETED: `${process.env.NEXT_PUBLIC_API_URL}/documents/deleted`,
    DOCUMENT_DELETED: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/deleted/${id}`,
    DOCUMENT_RESTORE: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}/restore`,
    USER: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
    DOCUMENT_SHARE: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}/share`,
    GET_DOCUMENT_BY_SHARE_TOKEN: (sharedToken: string) => `${process.env.NEXT_PUBLIC_API_URL}/shared/documents/${sharedToken}`,
    API_KEYS: `${process.env.NEXT_PUBLIC_API_URL}/auth/api-keys`,
    API_KEY: (apiKey: string) => `${process.env.NEXT_PUBLIC_API_URL}/auth/api-keys/${apiKey}`,
    API_KEYS_LOGIN: `${process.env.NEXT_PUBLIC_API_URL}/auth/api-keys/login`,
    API_KEY_PERMISSIONS: (apiKey: string) => `${process.env.NEXT_PUBLIC_API_URL}/auth/api-keys/${apiKey}/permissions`,
};