import { ApiKeyPrimitive } from "../../Domain/Primitives/ApiKeyPrimitive";

type PropsToOmit = 'apiKeyValue' | 'createdAt' | 'updatedAt';
export interface CreateApiKeyDTO extends Omit<ApiKeyPrimitive, PropsToOmit> {
}