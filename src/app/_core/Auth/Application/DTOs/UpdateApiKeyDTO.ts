import { ApiKeyPrimitive } from "../../Domain/Primitives/ApiKeyPrimitive";

type PropsToOmit = 'creatorId' | 'apiKeyValue' | 'permissions' | 'createdAt' | 'updatedAt';
export interface UpdateApiKeyDTO extends Omit<ApiKeyPrimitive, PropsToOmit> {
}