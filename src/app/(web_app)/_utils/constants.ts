export const API_ROUTES = {
    DOCUMENTS: `${process.env.NEXT_PUBLIC_API_URL}/documents`,
    DOCUMENT: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}`,
    DOCUMENTS_DELETED: `${process.env.NEXT_PUBLIC_API_URL}/documents/deleted`,
    DOCUMENT_DELETED: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/deleted/${id}`,
    DOCUMENT_RESTORE: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}/restore`,
    
    DOCUMENT_SHARE: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}/share`,
    GET_DOCUMENT_BY_SHARE_TOKEN: (sharedToken: string) => `${process.env.NEXT_PUBLIC_API_URL}/shared/documents/${sharedToken}`,
    
    ROOT_FOLDER_DOCUMENTS: `${process.env.NEXT_PUBLIC_API_URL}/folders/documents`,
    FOLDER_DOCUMENTS: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/folders/${id}/documents`,
    FOLDER_ANCESTORS: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/folders/${id}/ancestors`,

    FOLDERS: `${process.env.NEXT_PUBLIC_API_URL}/folders`,
    FOLDER: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/folders/${id}`,
    FOLDER_SHARE: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/folders/${id}/share`,

    USERS: `${process.env.NEXT_PUBLIC_API_URL}/users`,
    USER: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
    USER_CHANGE_PERMISSIONS: (userId: string) => `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/permissions`,
    USER_CHANGE_PASSWORD: (userId: string) => `${process.env.NEXT_PUBLIC_API_URL}/auth/${userId}/password`,

    USER_ACCOUNT: () => `${process.env.NEXT_PUBLIC_API_URL}/account`,

    AUTH_LOGIN: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    AUTH_API_KEYS_LOGIN: `${process.env.NEXT_PUBLIC_API_URL}/auth/api-keys/login`,
    
    API_KEYS: `${process.env.NEXT_PUBLIC_API_URL}/auth/api-keys`,
    API_KEY: (apiKey: string) => `${process.env.NEXT_PUBLIC_API_URL}/auth/api-keys/${apiKey}`,
    API_KEY_PERMISSIONS: (apiKey: string) => `${process.env.NEXT_PUBLIC_API_URL}/auth/api-keys/${apiKey}/permissions`,
    API_KEY_REGENERATE: (apiKey: string) => `${process.env.NEXT_PUBLIC_API_URL}/auth/api-keys/${apiKey}/regenerate`,
};