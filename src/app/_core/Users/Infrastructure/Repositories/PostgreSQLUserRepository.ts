import { EntityManager, MikroORM } from "@mikro-orm/core";
import { UserRepository } from "../../Domain/Repositories/UserRepository";
import { User } from "../../Domain/Entities/User";
import { UserPrimitive } from "../../Domain/Primitives/UserPrimitive";
import { Email } from "../../Domain/VOs/Email";
import { Id } from "../../../Shared/Domain/VOs/Id";

export class PostgreSQLUserRepository implements UserRepository {

    constructor(private orm: MikroORM) {
    }

    private getRepository(em: EntityManager) {
        const fork = em.getRepository<UserPrimitive>('Users');

        return fork;
    }

    async save(user: User): Promise<void> {
        const em = this.orm.em.fork()
        this.getRepository(em).upsert(user.toPrimitives());
        em.flush();
    }

    async findById(id: Id): Promise<User | null> {
        const em = this.orm.em.fork()
        const result = await this.getRepository(em).findOne({ id: id.value });
        if (!result) {
            return null;
        }

        return User.fromPrimitives(result);
    }

    async findByEmail(email: Email): Promise<User | null> {
        const em = this.orm.em.fork()
        const result = await this.getRepository(em).findOne({ email: email.value });
        if (!result) {
            return null;
        }

        return User.fromPrimitives(result);
    }
}