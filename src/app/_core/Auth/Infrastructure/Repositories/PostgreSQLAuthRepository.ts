import { EntityManager, MikroORM } from "@mikro-orm/core";
import { AuthRepository } from "../../Domain/Repositories/AuthRepository";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { Auth } from "../../Domain/Entities/Auth";
import { AuthPrimitive } from "../../Domain/Primitives/AuthPrimitive";
import { Option } from "../../../Shared/Domain/VOs/Option";

export class PostgreSQLAuthRepository implements AuthRepository {

    constructor(private orm: MikroORM) {
    }

    private get em() {
        return this.orm.em.fork()
    }

    private getRepository(em: EntityManager) {
        const fork = em.getRepository<AuthPrimitive>('Auths');

        return fork;
    }

    async save(auth: Auth): Promise<void> {
        this.getRepository(this.em).upsert(auth.toPrimitives());
    }

    async findByUserId(userId: Id): Promise<Auth[]> {
        const results = await this.getRepository(this.em).find({ userId: userId.value });
        
        return results.map((result) => Auth.fromPrimitives(result));
    }

    async findById(id: Id): Promise<Option<Auth>> {
        const result = await this.getRepository(this.em).findOne({ id: id.value });

        if (!result) {
            return Option.none();
        }

        return Option.some(Auth.fromPrimitives(result));
    }

    async delete(auth: Auth): Promise<void> {
        this.getRepository(this.em).nativeDelete({ id: auth.id.value });
    }
}