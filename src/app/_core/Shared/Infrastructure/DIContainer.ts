import { DocuFileRepository } from "../../Documents/Domain/Repositories/DocuFileRepository";
import { ContentFileStore } from "../../Documents/Domain/Repositories/ContentFileStore";
import { InMemoryContentFileStore } from "../../Documents/Infrastructure/Stores/InMemoryContentFileStore";
import { PostgreSQLDocuFileRepository } from "../../Documents/Infrastructure/Repositories/PostgreSQLDocuFileRepository";
import { EventBus } from "../Domain/Events/EventBus";
import { initMikroORM } from "./Persistence/MikroORM/init";
import { AccountRepository } from "../../Accounts/Domain/Repositories/AccountRepository";
import { PostgreSQLAccountRepository } from "../../Accounts/Infrastructure/Repositories/PostgreSQLAccountRepository";
import { AuthRepository } from "../../Auth/Domain/Repositories/AuthRepository";
import { S3ContentFileStore } from "../../Documents/Infrastructure/Stores/S3ContentFileStore";
import { PostgreSQLAuthRepository } from "../../Auth/Infrastructure/Repositories/PostgreSQLAuthRepository";
import { GetInMemoryEventBus } from "./Events/GetInMemoryEventBus";

type DependenciesImplementations = {
    [K in keyof Dependencies]: Dependencies[K];
}

export interface Dependencies {
    EventBus: EventBus;
    ContentFileStore: ContentFileStore;
    DocuFileRepository: DocuFileRepository;
    AccountRepository: AccountRepository;
    AuthRepository: AuthRepository;
}

export class DIContainer {

    private static _instance: DIContainer | null = null;

    private dependencies = new Map<keyof Dependencies, unknown>();
    private constructor() {
    }

    private static get instance(): DIContainer {
        return this._instance || (this._instance = new this());
    }

    public static get<K extends keyof Dependencies>(key: K): Dependencies[K] {
        if (!this.instance.dependencies.has(key)) {
            throw new Error(`Dependency "${key.toString()}" is not initialized`);
        }

        return this.instance.dependencies.get(key) as Dependencies[K];
    }

    private static set<K extends keyof Dependencies>(key: K, service: Dependencies[K]): void {
        this.instance.dependencies.set(key, service);
    }

    static async setup(): Promise<void> {
        const orm = await initMikroORM();

        const dependenciesImplementations: Omit<DependenciesImplementations, 'EventBus'> = {
            // ContentFileStore: new InMemoryContentFileStore(),
            ContentFileStore: new S3ContentFileStore(),
            DocuFileRepository: new PostgreSQLDocuFileRepository(orm),
            AccountRepository: new PostgreSQLAccountRepository(orm),
            AuthRepository: new PostgreSQLAuthRepository(orm),
        };

        Object.entries(dependenciesImplementations).forEach(([key, value]) => {
            DIContainer.set(key as keyof Dependencies, value);
        });

        DIContainer.set('EventBus', GetInMemoryEventBus());
    }
}

