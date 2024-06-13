import { MikroORM } from "@mikro-orm/core";
import { AuthRepository } from "../../Domain/Repositories/AuthRepository";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { Auth } from "../../Domain/Entities/Auth";
import { AuthPrimitive } from "../../Domain/Primitives/AuthPrimitive";

export class PostgreSQLAuthRepository implements AuthRepository {

    constructor(private orm: MikroORM) {
    }

    private get repository() {
        const fork = this.orm.em.fork().getRepository<AuthPrimitive>('Auths');

        return fork;
    }

    async save(auth: Auth): Promise<void> {
        this.repository.upsert(auth.toPrimitives());
    }

    async findByUserId(userId: Id): Promise<Auth[]> {
        const results = await this.repository.find({ userId: userId.value });
        
        return results.map((result) => Auth.fromPrimitives(result));
    }

}