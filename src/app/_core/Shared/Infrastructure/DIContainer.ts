import { DocuFileRepository } from "../../Documents/Domain/Contracts/DocuFileRepository";
import { ContentFileStore } from "../../Documents/Domain/Contracts/ContentFileStore";
import { InMemoryContentFileStore } from "../../Documents/Infrastructure/Stores/InMemoryContentFileStore";
import { SQLiteDocuFileRepository } from "../../Documents/Infrastructure/Repositories/SQLiteDocuFileRepository";
import { EventBus } from "../Domain/Events/EventBus";
import { GetInMemoryEventBus } from "../Events/GetInMemoryEventBus";
import { initMikroORM } from "./Persistence/MikroORM/init";
import { AccountRepository } from "../../Accounts/Domain/Contracts/AccountRepository";
import { SQLiteAccountRepository } from "../../Accounts/Infrastructure/Repositories/SQLiteAccountRepository";

type DependenciesImplementations = {
    [K in keyof Dependencies]: Dependencies[K];
}

export interface Dependencies {
    EventBus: EventBus;
    ContentFileStore: ContentFileStore;
    DocuFileRepository: DocuFileRepository;
    AccountRepository: AccountRepository;
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
            ContentFileStore: new InMemoryContentFileStore(),
            DocuFileRepository: new SQLiteDocuFileRepository(orm),
            AccountRepository: new SQLiteAccountRepository(orm),
        };

        Object.entries(dependenciesImplementations).forEach(([key, value]) => {
            DIContainer.set(key as keyof Dependencies, value);
        });

        DIContainer.set('EventBus', GetInMemoryEventBus());
    }
}

