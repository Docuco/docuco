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
        const result = await this.getRepository(this.em).findOne({ apiKeyValue: apiKey.value });

        if (!result) {
            return Option.none();
        }

        return Option.some(this.mapFromPersistenceToDomain(result));
    }
    
    async getAll(): Promise<ApiKey[]> {
        const results = await this.getRepository(this.em).findAll();
        
        return results.map(this.mapFromPersistenceToDomain);
    }
    
    async delete(apiKey: ApiKey): Promise<void> {
        await this.getRepository(this.em).nativeDelete({ apiKeyValue: apiKey.apiKeyValue.value });
    }

    private mapFromDomainToPersistence(apiKey: ApiKey): ApiKeyPrimitive {
        return {
            ...apiKey.toPrimitives(),
            apiKeyValue: this.encrypt(apiKey.apiKeyValue.value),
        }
    }

    private mapFromPersistenceToDomain(apiKey: ApiKeyPrimitive): ApiKey {
        return ApiKey.fromPrimitives({
            ...apiKey,
            apiKeyValue: this.decrypt(apiKey.apiKeyValue),
        });
    }

    private encrypt(text: string): string {
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.SECRET_ENCRYPT_KEY!), null);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    }

    private decrypt(text: string): string {
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.SECRET_ENCRYPT_KEY!), null);
        let decrypted = decipher.update(Buffer.from(text, 'hex'));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}