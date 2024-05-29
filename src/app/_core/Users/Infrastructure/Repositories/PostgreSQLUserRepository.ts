import { MikroORM } from "@mikro-orm/core";
import { UserRepository } from "../../Domain/Repositories/UserRepository";
import { User } from "../../Domain/Entities/User";
import { UserPrimitive } from "../../Domain/Primitives/UserPrimitive";
import { Email } from "../../Domain/VOs/Email";

export class PostgreSQLUserRepository implements UserRepository {

    constructor(private orm: MikroORM) {
    }

    private get repository() {
        const fork = this.orm.em.fork().getRepository<UserPrimitive>('Users');

        return fork;
    }

    async save(user: User): Promise<void> {
        this.repository.upsert(user.toPrimitives());
    }

    async find(email: Email): Promise<User | null> {
        const result = await this.repository.findOne({ email: email.value });
        if (!result) {
            return null;
        }

        return User.fromPrimitives(result);
    }
}