import { EntityManager, MikroORM } from "@mikro-orm/core";
import { ApiKeyRepository } from "../../Domain/Repositories/ApiKeyRepository";
import { ApiKey } from "../../Domain/Entities/ApiKey";
import { ApiKeyPrimitive } from "../../Domain/Primitives/ApiKeyPrimitive";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import crypto from 'crypto';
import { ApiKeyValue } from "../../Domain/VOs/ApiKeyValue";

export class PostgreSQLApiKeyRepository implements ApiKeyRepository {

    constructor(private orm: MikroORM) {
    }

    private get em() {
        return this.orm.em.fork()
    }

    private getRepository(em: EntityManager) {
        const fork = em.getRepository<ApiKeyPrimitive>('ApiKeys');

        return fork;
    }

    async save(apiKey: ApiKey): Promise<void> {
        this.getRepository(this.em).upsert(
            this.mapFromDomainToPersistence(apiKey)
        );
        this.em.flush();
    }

    async findByApiKeyValue(apiKey: ApiKeyValue): Promise<Option<ApiKey>> {
        const result = await this.getRepository(this.em).findOne({ apiKeyValue: encryptApiKey(apiKey.value) });
        console.log('result', result);

        if (!result) {
            return Option.none();
        }
        console.log('data', this.mapFromPersistenceToDomain(result));
        return Option.some(this.mapFromPersistenceToDomain(result));
    }
    
    async getAll(): Promise<ApiKey[]> {
        const results = await this.getRepository(this.em).findAll({
            orderBy: { createdAt: 'ASC' }
        });
        
        return results.map(this.mapFromPersistenceToDomain);
    }
    
    async delete(apiKey: ApiKey): Promise<void> {
        await this.getRepository(this.em).nativeDelete({ apiKeyValue: encryptApiKey(apiKey.apiKeyValue.value) });
    }

    private mapFromDomainToPersistence(apiKey: ApiKey): ApiKeyPrimitive {
        return {
            ...apiKey.toPrimitives(),
            apiKeyValue: encryptApiKey(apiKey.apiKeyValue.value),
        }
    }

    private mapFromPersistenceToDomain(apiKey: ApiKeyPrimitive): ApiKey {
        return ApiKey.fromPrimitives({
            ...apiKey,
            apiKeyValue: decryptApiKey(apiKey.apiKeyValue),
        });
    }

}

 function encryptApiKey(text: string): string {
    const cipher = crypto.createCipheriv('aes-256-ecb', getSecretToEncrypt(), null);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted
}

function decryptApiKey(text: string): string {
    console.log(text);
    const decipher = crypto.createDecipheriv('aes-256-ecb', getSecretToEncrypt(), null);
    let decrypted = decipher.update(text, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}

function getSecretToEncrypt(): string {
    const data = exactSize(process.env.SECRET_ENCRYPT_KEY!, 32, '-');
    console.log(data);
    console.log(data.length);
    return data;
    function exactSize(text: string, width: number, fillWith: string): string {
        fillWith = fillWith || '0';

        if (text.length > width) {
            return text.substring(0, width);
        }

        if (text.length < width) {
            return new Array(width - text.length + 1).join(fillWith) + text;
        }

        return text;
    }
}