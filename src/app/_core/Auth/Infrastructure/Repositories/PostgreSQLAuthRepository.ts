import { MikroORM } from "@mikro-orm/core";
import { AuthRepository } from "../../Domain/Repositories/AuthRepository";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { Auth } from "../../Domain/Entities/Auth";
import { AuthPrimitive } from "../../Domain/Primitives/AuthPrimitive";

export class PostgreSQLAuthRepository implements AuthRepository {

    constructor(private orm: MikroORM) {
    }

    private get repository() {
        const fork = this.orm.em.fork().getRepository<AuthPrimitive>('Auth');

        return fork;
    }

    async save(auth: Auth): Promise<void> {
        this.repository.upsert(auth.toPrimitives());
    }

    async findByUserId(userId: Id): Promise<Auth | null> {
        const result = await this.repository.findOne({ userId: userId.value });
        if (!result) {
            return null;
        }

        return Auth.fromPrimitives(result);    
    }

}