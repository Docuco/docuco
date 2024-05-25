export interface AuthDTO {
    accessToken: string;
    // refreshToken: string;
    expiresIn: number;
    tokenType: 'Bearer';
}