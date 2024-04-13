import { SettingsPrimitive } from "./SettingsPrimitive";

export interface AccountPrimitive {
    email: string;
    password: string,
    settings: SettingsPrimitive,
    createdAt: number;
    updatedAt: number;
}