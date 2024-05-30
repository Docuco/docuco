export interface AuthPrimitive {
    id: string;
    userId: string;
    password: string | null,
    createdAt: number;
    updatedAt: number;
}