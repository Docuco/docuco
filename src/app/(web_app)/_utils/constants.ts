export const API_ROUTES = {
    DOCUMENTS: `${process.env.NEXT_PUBLIC_API_URL}/documents`,
    DOCUMENT: (documentId: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${documentId}`,
    ROOT_DOCUMENTS_DELETED: `${process.env.NEXT_PUBLIC_API_URL}/documents/deleted`,
    DOCUMENTS_BY_FOLDER: (folderId: string) => `${process.env.NEXT_PUBLIC_API_URL}/folders/${folderId}/documents`,
    DOCUMENTS_DELETED_BY_FOLDER: (folderId: string) => `${process.env.NEXT_PUBLIC_API_URL}/folders/${folderId}/documents/deleted`,
    DOCUMENT_DELETED: (documentId: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/deleted/${documentId}`,
    DOCUMENT_RESTORE: (documentId: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${documentId}/restore`,
    
    DOCUMENT_SHARE: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}/share`,
    GET_DOCUMENT_BY_SHARE_TOKEN: (sharedToken: string) => `${process.env.NEXT_PUBLIC_API_URL}/shared/documents/${sharedToken}`,
    
    FOLDERS: `${process.env.NEXT_PUBLIC_API_URL}/folders`,
    FOLDER: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/folders/${id}`,
    ROOT_FOLDER_DOCUMENTS: `${process.env.NEXT_PUBLIC_API_URL}/folders/documents`,
    FOLDER_ANCESTORS: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/folders/${id}/ancestors`,
    FOLDERS_DELETED: `${process.env.NEXT_PUBLIC_API_URL}/folders/deleted`,
    FOLDER_DELETED: (folderId: string) => `${process.env.NEXT_PUBLIC_API_URL}/folders/deleted/${folderId}`,
    FOLDER_DELETED_BY_FOLDER_PARENT: (folderParentId: string) => `${process.env.NEXT_PUBLIC_API_URL}/folders/${folderParentId}/deleted`,
    FOLDER_RESTORE: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/folders/${id}/restore`,

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