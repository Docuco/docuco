import { ApiKeyPrimitive } from "../../Domain/Primitives/ApiKeyPrimitive";

type PropsToOmit = 'id' | 'creatorId' | 'apiKeyValue' | 'permissions' | 'createdAt' | 'updatedAt';
export interface UpdateApiKeyDTO extends Omit<ApiKeyPrimitive, PropsToOmit> {
}