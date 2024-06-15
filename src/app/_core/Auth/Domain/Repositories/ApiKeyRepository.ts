import { Option } from "../../../Shared/Domain/VOs/Option";
import { ApiKey } from "../Entities/ApiKey";
import { ApiKeyValue } from "../VOs/ApiKeyValue";

export interface ApiKeyRepository {
    save(apiKey: ApiKey): Promise<void>;
    findByApiKeyValue(id: ApiKeyValue): Promise<Option<ApiKey>>;
    getAll(): Promise<ApiKey[]>;
    delete(apiKey: ApiKey): Promise<void>;
}