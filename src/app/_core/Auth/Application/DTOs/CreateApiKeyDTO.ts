import { ApiKeyPrimitive } from "../../Domain/Primitives/ApiKeyPrimitive";

type PropsToOmit = 'id' | 'apiKeyValue' | 'createdAt' | 'updatedAt';
export interface CreateApiKeyDTO extends Omit<ApiKeyPrimitive, PropsToOmit> {
}